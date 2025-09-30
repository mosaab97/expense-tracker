import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authContext/AuthContext";
import FormInput from "../../components/FormInput";
import toast from "react-hot-toast";

const Login = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("first")
      await login(data);
      toast.success("Welcome back! 🎉");
    } catch (err) {
      console.log(err)
      setError("root", { message: "Invalid email or password" });
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-xl p-8 w-96 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Login
        </h2>

        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          register={register}
          rules={{
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/, message: "Invalid email address" },
          }}
          errors={errors}
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          register={register}
          rules={{
            required: "Password is required",
            minLength: { value: 6, message: "At least 6 characters" },
          }}
          errors={errors}
        />

        {errors.root && (
          <p className="text-red-600 text-sm text-center">
            {errors.root.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition disabled:opacity-50"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
