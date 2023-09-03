import { Routes, Route } from "react-router-dom";

import { ProtectedRoute } from "../protected-route/index";
import Authorisation from "../pages/loginPage";
import ChatPage from "../pages/chatPage";
import { NotFound } from "../pages/notFound";
import SenderPage from "../pages/senderPage";

export const AppRoutes = () => {
  const userId = localStorage.getItem("userId");
  return (
    <Routes>
      <Route path="/" element={<Authorisation />} />
      <Route path="*" element={<NotFound />} />

      <Route element={<ProtectedRoute isAllowed={Boolean(userId)} />}>
        <Route path="/addressee" element={<SenderPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Route>
    </Routes>
  );
};
