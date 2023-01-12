export const passwordDoubleCheck = (password, passwordToCheck)=>{
    return password === passwordToCheck;
}

export const verifyPassword = (password)=>{
    if(
        pwFormatLength(password)
        && pwFormatLeastNum(password)
        && pwFormatUppercase(password)
        && pwFormatSpecial(password)
    ) return true
    else return false;
}

export const emailFormat=(value)=>{
    return value.includes('@'&&'.'); 
}

export const nicknameFormat= (value)=>{
    return 8 <= value.length && value.length <= 32;
}

export const pwFormatLength = (value)=>{
    return 8 <= value.length && value.length <= 32;
} 

export const pwFormatLeastNum = (value)=>{
    if(value.match(/[0-9]/g)){
        return true;
    }else{
        return false;
    }
}

export const pwFormatUppercase = (value)=>{
    if(value.match(/[A-Z]/g)){
        return true;
    }else{
        return false;
    }
}

export const pwFormatSpecial = (value)=>{
    if(value.match(/[@#$%^&+!=]/g)){
        return true;
    }else{
        return false;
    }
}