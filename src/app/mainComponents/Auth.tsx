import { useState, useMemo, useEffect } from "react";
import PageTitle from "src/pages/core/pageTitle/PageTitle";
import AuthButtons from "src/pages/main/auth/AuthButtons";
import AuthForm from "src/pages/main/auth/AuthForm";
import Motions from "src/app/mainComponents/Motions";
// import { supabase } from "src/baseApi/base";

function Auth() {
  const motions = useMemo(() => <Motions />, []);
  return (
    <div>
      <PageTitle title={"로그인"} />
      <div className="flex justify-center p-5">
        반갑습니다. 캠퍼스 우산 공유 서비스 쿠우산입니다.
      </div>
      <AuthForm signIn={true} />
      <AuthButtons />
      <div className="flex justify-center pt-5 px-5">
        날씨 플레이리스트도 준비되어 있어요.
      </div>
      {motions}
    </div>
  );
}

export default Auth;
