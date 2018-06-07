module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'RxContextObservable',
      externals: {
        react: 'React'
      }
    }
  }
}
