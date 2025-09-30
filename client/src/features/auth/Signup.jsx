import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authContext/AuthContext";
import FormInput from "../../components/FormInput";
import toast from "react-hot-toast";

const Signup = () => {
  const { signup } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }
    try {
      await signup(data);
      toast.success("Account created! 🚀");
    } catch (err) {
      console.log(err)
      setError("root", { message: "Signup failed" });
      toast.error( err.response.data.message || "Signup failed. Try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-xl p-8 w-96 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Sign Up
        </h2>

        <FormInput
          label="Name"
          name="name"
          placeholder="John Doe"
          register={register}
          rules={{ required: "Name is required" }}
          errors={errors}
        />

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

        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          register={register}
          rules={{ required: "Please confirm your password" }}
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
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition disabled:opacity-50"
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
