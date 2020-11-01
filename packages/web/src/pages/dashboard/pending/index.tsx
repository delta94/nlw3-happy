import React from 'react'

import OrphanageCard from '@/components/OrphanageCard'
import Sidebar from '@/components/Sidebar'
import { NextPage, NextPageContext } from 'next'
import Link from 'next/link'
import Router from 'next/router'
import { FiArrowRight } from 'react-icons/fi'

import SadFace from '../../../assets/logo-sad.svg'
import {
  Container,
  Contents,
  Header,
  Separator,
  Button,
  OrphanagesContainer,
  NoOrphanages
} from './styles'

interface Orphanage {
  id: string
  name: string
  slug: string
  latitude: number
  longitude: number
}

interface PendingProps {
  orphanages: Orphanage[]
}

const Pending: NextPage<PendingProps> = ({ orphanages }) => {
  return (
    <Container>
      <Sidebar />

      <Contents>
        <Header>
          <h1>Cadastros pendentes</h1>
          {orphanages.length > 0 && (
            <span>
              {orphanages.length} orfanato{orphanages.length > 1 ? 's' : ''}
            </span>
          )}
        </Header>
        <Separator />

        <OrphanagesContainer>
          {!orphanages ? (
            <NoOrphanages>
              <SadFace />
              Nenhum no momento
            </NoOrphanages>
          ) : (
            orphanages.map(orphanage => (
              <OrphanageCard data={orphanage} key={orphanage.id}>
                <Link href={`/orphanages/${orphanage.slug}/edit`}>
                  <Button>
                    <FiArrowRight size={24} color="#15C3D6"></FiArrowRight>
                  </Button>
                </Link>
              </OrphanageCard>
            ))
          )}
        </OrphanagesContainer>
      </Contents>
    </Container>
  )
}
Pending.getInitialProps = async (context: NextPageContext) => {
  const cookie = context.req?.headers.cookie

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orphanages/pending`,
    {
      credentials: 'include',
      headers: {
        cookie: cookie
      }
    }
  )
  const json = await response.json()

  if (response.status === 401 && !context.req) {
    Router.replace('/signin')
  }

  if (response.status === 401 && context.req) {
    context.res.writeHead(302, {
      Location: `${process.env.NEXT_PUBLIC_APP_URL}/signin`
    })
    context.res.end()
  }
  return { orphanages: json }
}

export default Pending
