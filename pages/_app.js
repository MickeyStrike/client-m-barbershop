import '../styles/globals.css'
import { useStore } from '../storeRedux/store'
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'
function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
