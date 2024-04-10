const  getRequestedHeader = () => {
    const token = localStorage?.getItem('token')
    return token 
    ?   {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        :
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
}

export default getRequestedHeader