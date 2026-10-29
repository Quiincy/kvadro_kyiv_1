import React from 'react'
import type { ServerFunctionClient } from 'payload'
import config from '@payload-config'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import { importMap } from './admin/importMap'
import '@payloadcms/next/css'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const Layout = async ({ children }: Args) => {
  try {
    return (
      <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
        {children}
      </RootLayout>
    )
  } catch (err: any) {
    if (err?.digest?.startsWith?.('NEXT_REDIRECT') || err?.digest?.startsWith?.('NEXT_NOT_FOUND')) {
      throw err
    }
    console.error('Payload Admin RootLayout error:', err)
    return (
      <html lang="en">
        <body style={{ padding: 40, fontFamily: 'monospace', color: '#ff5555', background: '#0e1117' }}>
          <h2>Payload RootLayout Error</h2>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#1c212e', padding: 20, borderRadius: 8, color: '#ffaaaa' }}>
            {err?.stack || err?.message || String(err)}
          </pre>
        </body>
      </html>
    )
  }
}

export default Layout


