"use client";
import { useEffect } from "react";

export default function BitrixWidget() {
  useEffect(() => {
    if (document.getElementById("bitrix24-script")) return;

    const script = document.createElement("script");
    script.id = "bitrix24-script";
    script.src = "https://cdn-ru.bitrix24.by/b34208610/crm/site_button/loader_1_mykez7.js?" + (Date.now() / 60000 | 0);
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return null;
}
