import React, { useState, useEffect } from "react";
import { FiFlag } from "react-icons/fi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SelectTest from "../Components/SelectTest";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Practice() {
  return <Outlet />;
}
