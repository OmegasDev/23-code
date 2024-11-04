import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '07bu6qfs',
    dataset: 'production'
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
