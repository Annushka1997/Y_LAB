import { useState } from 'react';
import './authentication-form.css'

const AuthenticationForm = () => {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState('');
  const [ loading, setLoading ] =useState(false);
  const [ success, setSuccess ] = useState(false)

  const validateEmail = (email) => {
    
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateEmail(email)) {
      setError("Введите корректный адрес электройной почты");
      return;
    }

    if (password.length < 6) {
      setError("Пароль должен содержать как минимум 6 символов");
      return;
    }

    setLoading(true);

    try {
      const response = await fakeFetch({ email, password });

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(response.message || "Ошибка аунтификации");
      }
    } catch (error) {
      setError("Произошла ошибка при отправке запроса на сервер")
    } finally {
      setLoading(false);
    }

  };

  const fakeFetch = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (data.email === "user@example.com" && data.password === "password123") {
          resolve({ok: true});
        } else {
          resolve({ ok: false, message: "Неверный email или пароль"})
        }
      }, 1000);
    });
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>

        {error && <p className="error-message"> {error} </p>}
        {success && <p className="success-message"> Успешная аунтификация </p>}

        <h2> Вход </h2>
        <input name="email" type="email" placeholder="Enter your mail..." onChange={(e) => setEmail(e.target.value)} required/>
        <input name="password" type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required/>
        <button name="submit" type="submit" className="submit-btn" disabled={loading}> {loading ? "Вход..." : "Войти..."} </button>
      </form>
    </div>
  );
}

export default AuthenticationForm;