import './index.css';
import Api from '../../services/Api';

export function Login({
    onReceive
}) {
    const handleLogin = async () => {
        let result = await Api.googlePopUp()
        if (result) {
            onReceive(result.user);
        } else {
            alert("Error!");
        }
    }
    return (
        <div className="login">
            <div className="login--form-container">
                <h1 className="login--h1">Whatsapp Web</h1>
                <fieldset className="login--fieldset">
                    <button className="login--btn" onClick={handleLogin}>
                        <img className="logo-google" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/25px-Google_%22G%22_Logo.svg.png" alt="img-google" />
                        Entre com uma conta Google
                    </button>
                </fieldset>
            </div>
            <footer>
                <p>copyright @2021 | feito por <a className="link" href="https://github.com/LarissaSiq"
                    target="blank">
                    Larissa Siqueira
                </a></p></footer>
        </div >

    );
}
export default Login;