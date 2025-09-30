import { useState } from "react";
import Logo from "../../Assets/Logo.png";
import { toast } from "react-toastify";
import {
  forgotPassword,
  resetPassword,
  verifyOTP,
} from "../../Services/authService";
import { useNavigate } from "react-router-dom";

const EnterEmailPage = ({ email, setEmail, setStep }: any) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast("Please enter your email.");
      return;
    }

    if (!emailRegex.test(email)) {
      toast("Email not valid. Please enter Email again.");
      return;
    }

    console.log(email);

    let response: any = await forgotPassword(email);
    if (response && response.code === 200) {
      toast("OTP sent successfully to your email.");
      setStep(2);
    } else {
      toast("Failed to send OTP. Please try again.");
      return;
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-sky-300 min-h-screen flex items-center justify-center">
      <div className="flex min-h-full w-[400px] flex-col justify-center px-6 py-12 lg:px-8 border rounded-2xl bg-white shadow-lg">
        {/* Logo + Heading */}
        <div className="mt-2 flex items-center justify-center">
          <div>
            <img src={Logo} alt="Logo" className="mx-auto mt-4 h-20 w-auto" />
          </div>
          <div>
            <p className="mt-2 text-center text-sm/6 text-gray-500 font-overlock border-b-2 border-gray-300">
              <b>ONLINE QUIZ</b>
            </p>
            <p className="text-center text-sm/6 text-gray-500">
              Quick Test – Accurate Results!
            </p>
          </div>
        </div>

        {/* Title */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Forgot password
          </h2>
          <p className="mt-2 text-center text-sm/6 text-gray-500">
            Enter the email or phone number linked to your account to receive an
            OTP code
          </p>
        </div>

        {/* Form */}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full border rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />

            {/* Submit */}
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const EnterCodePage = ({ email, setStep, code, setCode }: any) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email);

    let response: any = await verifyOTP(email, code);
    if (response && response.code === 200) {
      toast("Verify OTP successfully");
      setStep(3);
    } else {
      toast("Failed to verify OTP. Please try again.");
      return;
    }
    setStep(3); // chuyển sang bước reset password
  };

  return (
    <div className="bg-gradient-to-b from-white to-sky-300 min-h-screen flex items-center justify-center">
      <div className="flex min-h-full w-[400px] flex-col justify-center px-6 py-12 lg:px-8 border rounded-2xl bg-white shadow-lg">
        {/* Logo + Heading */}
        <div className="mt-2 flex items-center justify-center">
          <div>
            <img src={Logo} alt="Logo" className="mx-auto mt-4 h-20 w-auto" />
          </div>
          <div>
            <p className="mt-2 text-center text-sm/6 text-gray-500 font-overlock border-b-2 border-gray-300">
              <b>ONLINE QUIZ</b>
            </p>
            <p className="text-center text-sm/6 text-gray-500">
              Quick Test – Accurate Results!
            </p>
          </div>
        </div>

        {/* Title */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Forgot password
          </h2>
          <p className="mt-2 text-center text-sm/6 text-gray-500">
            Enter the code you just received
          </p>
        </div>

        {/* Form */}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="tel"
              name="code"
              id="code"
              placeholder="6 characters"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="block w-full border rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />

            {/* Submit */}
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const ResetPasswordPage = ({ email, navigate }: any) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      toast("Please fill in both password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast("Passwords do not match.");
      return;
    }

    // Xử lý logic reset password ở đây
    try {
      let response: any = await resetPassword(email, newPassword);
      if (response && response.code === 200) {
        toast("Password reset successfully!");
      } else toast("Failed to reset password. Please try again.");
    } catch (error) {
      toast("Failed to reset password. Please try again.");
    }

    navigate("/login"); // Chuyển hướng về trang đăng nhập sau khi reset thành công
  };

  return (
    <div className="bg-gradient-to-b from-white to-sky-300 min-h-screen flex items-center justify-center">
      <div className="flex min-h-full w-[400px] flex-col justify-center px-6 py-12 lg:px-8 border rounded-2xl bg-white shadow-lg">
        {/* Logo + Heading */}
        <div className="mt-2 flex items-center justify-center">
          <div>
            <img src={Logo} alt="Logo" className="mx-auto mt-4 h-20 w-auto" />
          </div>
          <div>
            <p className="mt-2 text-center text-sm/6 text-gray-500 font-overlock border-b-2 border-gray-300">
              <b>ONLINE QUIZ</b>
            </p>
            <p className="text-center text-sm/6 text-gray-500">
              Quick Test – Accurate Results!
            </p>
          </div>
        </div>

        {/* Title */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Reset password
          </h2>
        </div>

        {/* Form */}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="password"
              name="new-password"
              id="new-password"
              autoComplete="new-password"
              placeholder="New password"
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="block w-full border rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />

            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              autoComplete="confirm-password"
              placeholder="Re-enter new password"
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full border rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />

            {/* Submit */}
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // useState phải đặt trong component
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  return (
    <>
      {step === 1 ? (
        <EnterEmailPage email={email} setEmail={setEmail} setStep={setStep} />
      ) : step === 2 ? (
        <EnterCodePage
          email={email}
          setStep={setStep}
          code={code}
          setCode={setCode}
        />
      ) : (
        <ResetPasswordPage email={email} navigate={navigate} />
      )}
    </>
  );
};

export default ForgotPassword;
