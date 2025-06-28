const PasswordGenerator = () => {
    try {
        const randomStrings = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-_=+[]{}|\<>?/`~\\ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        
        let password = '';
        for(let i=0; i<16; i++){
            let randomNum = Math.floor(Math.random()*randomStrings.length-1);
            password += randomStrings[randomNum];
        }
        return password;
    } catch (error) {
        console.error(error);
    }
}

export default PasswordGenerator;