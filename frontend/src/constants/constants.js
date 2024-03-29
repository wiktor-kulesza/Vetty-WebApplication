// api calls
export const SERVER_PORT = 8080
export const SERVER_ADDRESS = "http://localhost"
export const COLON = ":"
export const URL = SERVER_ADDRESS + COLON + SERVER_PORT
export const API_GET_ALL_PETS = "/api/pets/all"
export const API_GET_ALL_PETS_IMAGES = "/api/images/all"
export const API_GET_ALL_BREEDS = "/api/breeds/all"
export const API_GET_IMAGE_BY_ID = "/api/images/"
export const API_GET_PET_BY_ID = "/api/pets/"
export const API_GET_PETS_BY_USER_EMAIL = "/api/pets/user?email="
export const API_GET_PETS_WITH_PUBLIC_MED_HIS_BY_USER_EMAIL = "/api/pets/user/public?email="
export const API_GET_RESULTS_FROM_IMAGE = "/api/result"
export const API_GET_MEDICAL_HISTORIES_BY_USER_EMAIL = "/api/medical-history/user"
export const API_GET_ALL_THREADS = "/api/threads/all"
export const API_GET_ALL_THREADS_BY_PET_ID = "/api/threads/pet/"
export const API_GET_ALL_TAGS = "/api/tags/all"
export const API_GET_THREAD_BY_ID = "/api/threads/"
export const API_GET_USER_BY_EMAIL = "/api/users?email="
export const API_GET_PET_STATISTICS_BY_ID = "/api/statistics/pet/"

export const API_CHECK_IF_USER_EXISTS = "/api/users/exists"
export const API_SEARCH_THREADS = "/api/threads/search"

export const API_LIKE_THREAD = "/api/threads/like"
export const API_LIKE_COMMENT = "/api/comments/like"

export const API_ADD_PET = "/api/pets"
export const API_ADD_IMAGE = "/api/images"
export const API_ADD_MEDICAL_HISTORY = "/api/medical-history"
export const API_ADD_THREAD = "/api/threads"
export const API_ADD_COMMENT = "/api/threads/comment"

export const API_DELETE_PET_BY_ID = "/api/pets/"
export const API_DELETE_MEDICAL_HISTORY_BY_ID = "/api/medical-history/"
export const API_DELETE_COMMENT = "/api/threads/comment"

export const API_MODIFY_PET_BY_ID = "/api/pets/"


//authorization
export const API_LOGIN = "/api/users/login"
export const API_REGISTER = "/api/users/register"
export const SALT = 10
export const MIN_PASSWORD_LENGTH = 8
export const MAX_PASSWORD_LENGTH = 20


// messages
export const LOGIN_SUCCESS = 'You have successfully logged in!'
export const ACTION_INVALID = "This action is invalid!"
export const FETCH_ERROR = 'Could not fetch the data for that resource'
export const FORBIDDEN_ERROR = 'You are not authorized to access this page'


// view links
export const HOME = '/'
export const LOGIN = '/login'
export const LOGOUT = '/logout'
export const REGISTER = '/signup'
export const PET_LIST = '/pets'
export const ADD_PET = '/add/pet'
export const MODIFY_PET = '/modify/pets/'
export const MODIFY_MEDICAL_HISTORY = '/modify/medical-history/'
export const ADD_MEDICAL_HISTORY = '/add/medical-history/'
export const PET = '/pet/'
export const MEDICAL_HISTORY = '/medical-history/'
export const THREAD = '/thread/'
export const SEARCH_PROFILE = '/profile/'

// assets
export const DEFAULT_PET_IMAGE = './assets/default-pet-image.jpg'
export const DEFAULT_USER_IMAGE = './assets/default-user-image.jpg'
