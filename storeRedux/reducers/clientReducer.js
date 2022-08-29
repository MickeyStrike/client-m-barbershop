import {
  SET_DATA_CLIENT,
  SET_INNER_WIDTH,
  SET_INNER_HEIGHT,
  SET_VISIBLE_LOGIN,
  SET_VISIBLE_DRAWER_MOBILE_MENU,
  SET_NOTIFICATION,
  SET_VISIBLE_PROFILE,
  SET_IS_LOGIN,
  SET_VISIBLE_DETAIL_PRODUCT,
  SET_LIST_MERCHANDISE,
  SET_DETAIL_MERCHANDISE,
  SET_DATA_FAVOURITE_PRODUCT,
  SET_DATA_TRANSACTION,
  SET_DATA_HISTORY_TRANSACTION,
  SET_LIST_TAGS,
  SET_LOADING_MERCHANDISE,
  SET_LOADING_TRANSACTION,
  SET_LIST_BOOKING,
  SET_LOADING_BOOKING_LIST,
  SET_VISIBLE_ADD_NEW_ADDRESS,
  SET_VISIBLE_ADDRESS,
  SET_LOADING_ADDRESS,
  SET_DATA_ADDRESS,
  SET_TRANSACTION_PAYMENT,
  SET_TRANSACTION_PAYMENT_HAIRCUT,
} from '../types/clientTypes'

const initialState = {
  dataClient: {},
  innerWidth: 0,
  innerHeight: 0,
  visibleLogin: false,
  visibleProfile: false,
  visibleDrawerMobileMenu: false,
  visibleDetailProduct: false,
  visibleAddNewAddress: false,
  visibleAddress: false,
  isLogin: false,
  loadingMerchandise: false,
  loadingTransaction: false,
  loadingBookingList: false,
  loadingAddress: false,
  dataAddress: {},
  notifRedux: {},
  dataListMerchandise: [],
  dataListTags: [],
  dataDetailMerchandise: {},
  dataFavouriteProduct: {},
  dataTransaction: {},
  dataHistoryTransaction: [],
  dataTransactionPayment: {},
  dataTransactionPaymentHaircut: {},
  dataListBooking: {},
}

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_CLIENT:
      return { ...state, dataClient: action.payload }
    case SET_INNER_WIDTH:
      return { ...state, innerWidth: action.payload }
    case SET_INNER_HEIGHT:
      return { ...state, innerHeight: action.payload }
    case SET_VISIBLE_LOGIN:
      return { ...state, visibleLogin: action.payload }
    case SET_VISIBLE_PROFILE:
      return { ...state, visibleProfile: action.payload }
    case SET_IS_LOGIN:
      return { ...state, isLogin: action.payload }
    case SET_VISIBLE_DETAIL_PRODUCT:
      return { ...state, visibleDetailProduct: action.payload }
    case SET_VISIBLE_DRAWER_MOBILE_MENU:
      return { ...state, visibleDrawerMobileMenu: action.payload }
    case SET_VISIBLE_ADD_NEW_ADDRESS:
      return { ...state, visibleAddNewAddress: action.payload }
    case SET_VISIBLE_ADDRESS:
      return { ...state, visibleAddress: action.payload }
    case SET_NOTIFICATION:
      return { ...state, notifRedux: action.payload }
    case SET_LIST_MERCHANDISE:
      return { ...state, dataListMerchandise: action.payload }
    case SET_LIST_TAGS:
      return { ...state, dataListTags: action.payload }
    case SET_DETAIL_MERCHANDISE:
      return { ...state, dataDetailMerchandise: action.payload }
    case SET_DATA_ADDRESS:
      return { ...state, dataAddress: action.payload }
    case SET_DATA_FAVOURITE_PRODUCT:
      return { ...state, dataFavouriteProduct: action.payload }
    case SET_DATA_TRANSACTION:
      return { ...state, dataTransaction: action.payload }
    case SET_DATA_HISTORY_TRANSACTION:
      return { ...state, dataHistoryTransaction: action.payload }
    case SET_TRANSACTION_PAYMENT:
      return { ...state, dataTransactionPayment: action.payload }
    case SET_TRANSACTION_PAYMENT_HAIRCUT:
      return { ...state, dataTransactionPaymentHaircut: action.payload }
    case SET_LIST_BOOKING:
      return { ...state, dataListBooking: action.payload }
    case SET_LOADING_MERCHANDISE:
      return { ...state, loadingMerchandise: action.payload }
    case SET_LOADING_TRANSACTION:
      return { ...state, loadingTransaction: action.payload }
    case SET_LOADING_ADDRESS:
      return { ...state, loadingAddress: action.payload }
    case SET_LOADING_BOOKING_LIST:
      return { ...state, loadingBookingList: action.payload }
    default:
      return state
  }
}

export default clientReducer