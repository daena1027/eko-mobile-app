export function usernameValidator(username) {
    if (!username) 
        return "Username is required."
    
    if (username.length < 5) 
        return "Username must be at least 5 characters long."    
    
    if (username.length > 20) 
        return "Username must be less than 20 characters long."
        
    if (!/^[a-zA-Z0-9_]+$/.test(username)) 
           return "Username can only contain letters, numbers, and underscores."
    return ''
        }
{/*added usernameValidator function*/}
  

