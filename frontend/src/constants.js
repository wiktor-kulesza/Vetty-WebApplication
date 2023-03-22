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
export const API_GET_PETS_BY_USER_EMAIL = "/api/pets/user/"

export const API_ADD_PET = "/api/pets"
export const API_ADD_IMAGE = "/api/images"

export const API_DELETE_PET_BY_ID = "/api/pets/"
export const API_DELETE_MEDICAL_HISTORY_BY_ID = "/api/medicalHistory/"

export const API_MODIFY_PET_BY_ID = "/api/pets/"


//authorization
export const API_LOGIN = "/api/users/login"
export const API_REGISTER = "/api/users/register"
export const SALT = 10

// messages
export const LOGIN_SUCCESS = 'You have successfully logged in!'
export const ACTION_INVALID = "This action is invalid!"
export const FETCH_ERROR = 'Could not fetch the data for that resource'
export const FORBIDDEN_ERROR = 'You are not authorized to access this page'


// view links
export const HOME = '/'
export const LOGIN = '/login'
export const REGISTER = '/signup'
export const PET_LIST = '/pets'
export const ADD_PET = '/add/pet'
export const MODIFY_PET = '/modify/pets/'
export const MODIFY_MEDICAL_HISTORY = '/modify/medicalHistory/'
export const PET = '/pet/'
export const MEDICAL_HISTORY = '/medical-history/'

// assets
export const DEFAULT_PET_IMAGE = './assets/default-pet-image.jpg'
