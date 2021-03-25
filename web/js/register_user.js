const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const username = document.getElementById("reg_username");
const email = document.getElementById("email");
const password = document.getElementById("reg_password");
const signup_submit = document.getElementById("signup-submit");

const form = document.getElementById("signup-form");
const error_message = document.getElementById("signup-err");

function signupformValidation()
{    
    if(username_validation(username,5,12))
    {
        if(password_validation(password,6,12))
        {
            if(allLetter(firstname) && allLetter(lastname))
            {
                if(email_validation(email))
                {
                }          
            }
        }
    }
    return false;
}

function username_validation(un,mx,my)
{
    var un_len = un.value.length;
    if (un_len == 0 || un_len >= my || un_len < mx)
    {
        alert("Username should not be empty and length should be between " + mx + " to " + my);
        un.focus();
        return false;
    }
    return true;
}

function password_validation(pw,mx,my)
{
    var pw_len = pw.value.length;
    if (pw_len == 0 ||pw_len >= my || pw_len < mx)
    {
        alert("Password should not be empty / length be between " + mx + " to " + my);
        pw.focus();
        return false;
    }
    return true;
}

function allLetter(name)
{ 
    var letters = /^[A-Za-z]+$/;
    if(name.value.match(letters))
    {
        return true;
    }
    else
    {
        alert('Your first and last name must contain alphabet characters only');
        name.focus();
        return false;
    }
}

function email_validation(email)
{
    var eformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.value.match(eformat))
    {
        alert('Form Successfully Submitted');
        return true;
    }
    else
    {
        alert("You have entered an invalid email address!");
        email.focus();
        return false;
    }
}

