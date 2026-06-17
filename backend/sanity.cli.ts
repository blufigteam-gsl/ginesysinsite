import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'owxo5knj',
    dataset: 'production'
  },
  deployment: {
    appId: 'p4pa11shd4nio93e9in03nsa',
    autoUpdates: true,
  }
})