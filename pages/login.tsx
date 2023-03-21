import Head from "next/head";
import Image from "next/legacy/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

interface Inputs {
  email: string;
  password: string;
}

function Login() {
  const { signIn, signUp } = useAuth();
  const [login, setLogin] = useState(false);
  const [IsTestAccShown, setIsTestAccShown] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <div className="relative flex flex-col w-screen h-screen bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="/netflix-background.jpg"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
        alt={""}
      />

      <img
        src="https://rb.gy/ulxxee"
        className="absolute object-contain cursor-pointer left-4 top-4 md:left-10 md:top-6"
        width={150}
        height={150}
      />

      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative px-6 pt-10 pb-4 mt-24 space-y-8 rounded bg-black/75 md:mt-0 md:max-w-md md:px-14"
        >
          <h1 className="text-4xl font-semibold">Sign In</h1>
          <div className="space-y-4">
            <label className="inline-block w-full">
              <input
                type="email"
                placeholder="Email"
                className="input"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid email.
                </p>
              )}
            </label>

            <label className="inline-block w-full">
              <input
                type="password"
                placeholder="Password"
                className="input"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Your password must contain between 4 and 20 characters.
                </p>
              )}
            </label>
          </div>

          <button
            className="w-full rounded bg-[#e50914] py-3 font-semibold"
            onClick={() => setLogin(true)}
          >
            Sign In
          </button>

          <div className=" text-[gray] ">
            New to Netflix?{" "}
            <div className="flex space-x-1">
              <button
                type="submit"
                className="text-white hover:underline "
                onClick={() => setLogin(false)}
              >
                Sign up now
              </button>
              <p className="text-white">-</p>
              <button
                className="text-white hover:underline"
                onClick={() => setIsTestAccShown(true)}
              >
                Get Test Account
              </button>
            </div>
          </div>
        </form>
        <div
          className={`${
            IsTestAccShown
              ? "relative px-6 pb-4 rounded bg-black/75 md:mt-0 md:max-w-md md:px-14"
              : "hidden"
          }`}
        >
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p>Test account: </p>
              <p>Username: Test@test.com </p>
              <p>Password: 123456 </p>
            </div>
            <button
              className="text-white hover:underline mb-10 font-bold max-w-[70px] text-justify"
              onClick={() => setIsTestAccShown(false)}
            >
              Hide Test Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
