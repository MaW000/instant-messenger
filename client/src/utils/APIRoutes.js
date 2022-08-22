
export const host = `http://localhost:${process.env.REACT_APP_LOCALHOST_KEY}`
export const registerRoute = `${host}/auth/register`
export const loginRoute = `${host}/auth/login` 
export const allUsersRoute = `${host}/api/allusers`
export const setAvatarRoute = `${host}/api/setAvatar`
export const sendMessageRoute = `${host}/api/addmsg`
export const getMessagesRoute = `${host}/api/getmsg`
export const createServerRoute = `${host}/api/createserver`
export const getServerRoute = `${host}/api/getserver`
export const getMessageServerRoute = `${host}/api/getservermsg`