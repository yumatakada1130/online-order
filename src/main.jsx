import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ShoppingCart,
  Plus,
  Minus,
  CheckCircle2,
  CalendarDays,
  Printer
} from "lucide-react";

const stores = [
  "カネマン 盛岡南777",
  "カネマン 津志田",
  "カネマン MPlus+",
  "カネマン アズ水沢",
  "カネマン 奥州1111",
  "カネマン 金ケ崎",
  "カネマン 大船渡",
  "カネマン 陸前高田",
  "カネマン ルート45"
];

const productNames = [
  "神戸居留地うららか天然水ﾍﾟｯﾄ 550ML",
  "神戸茶房緑茶(25)ﾍﾟｯﾄ 500ml",
  "神戸茶房麦茶ﾍﾟｯﾄ 500ml",
  "神戸居留地炭酸水ﾚﾓﾝ(18)ﾍﾟｯﾄ 500ml",
  "神戸居留地炭酸水(18)ﾍﾟｯﾄ 500ml",
  "神戸居留地ｻｲﾀﾞｰｾﾞﾛ(20)缶 350ml",
  "神戸居留地LASｺｰﾗ(20)缶 350ml",
  "神戸居留地LASｺｰﾗｾﾞﾛ(20)缶 350ml",
  "神戸居留地LASﾚﾓﾝﾗｲﾑ(20)缶 350ml",
  "神戸居留地LASｼﾞﾝｼﾞｬｰｴｰﾙ(20)缶 350ml",
  "ﾌｪﾘｰﾁｪﾒﾛﾝｸﾘｰﾑｿｰﾀﾞ缶 350ml",
  "ﾌｪﾘｰﾁｪﾎﾜｲﾄｸﾘｰﾑｿｰﾀﾞ缶 350ml",
  "神戸茶房緑茶(25)缶 340g",
  "神戸居留地うららか天然水ﾍﾟｯﾄ 300ml",
  "神戸居留地ｶﾞﾂﾝｺﾞｰﾙﾄﾞ(21)缶 185ml"
];
const remainingProducts = [
  "神戸居留地ﾌﾞﾚﾝﾄﾞｺｰﾋｰ缶 185G",
  "神戸居留地微糖ｺｰﾋｰ(20)缶 185G",
  "神戸居留地ﾌﾞﾗｯｸｺｰﾋｰ(20)缶 185G",
  "神戸居留地ｶﾌｪｵﾚ(20)缶 185G",
  "ｶﾌｪﾄﾞﾘｯﾌﾟ微糖ｺｰﾋｰ缶 185G",
  "ｶﾌｪﾄﾞﾘｯﾌﾟﾌﾞﾗｯｸｺｰﾋｰ缶 185G",
  "ｶﾌｪﾄﾞﾘｯﾌﾟｶﾌｪｵﾚ缶 185G",
  "ｶﾌｪﾄﾞﾘｯﾌﾟﾌﾞﾚﾝﾄﾞｺｰﾋｰ缶 185G",
  "神戸居留地ｱｯﾌﾟﾙ100%(新)缶 185G",
  "神戸居留地ｸﾞﾚｰﾌﾟ100%(新)缶 185G",
  "神戸居留地ｱｾﾛﾗ(20)缶 185g",
  "神戸居留地すっきりｵﾚﾝｼﾞ(新)缶 185g",
  "神戸居留地すっきりｱｯﾌﾟﾙ(新)缶 185g",
  "神戸居留地はちみつﾚﾓﾝ(新)缶 185g"
];

productNames.push(...remainingProducts);

const products = productNames.map((name, i) => ({
  id: i + 1,
  name
}));

const holidays = new Set([
  "2026-01-01","2026-01-12","2026-02-11","2026-02-23",
  "2026-03-20","2026-04-29","2026-05-03","2026-05-04",
  "2026-05-05","2026-05-06","2026-07-20","2026-08-11",
  "2026-09-21","2026-09-22","2026-09-23","2026-10-12",
  "2026-11-03","2026-11-23",
  "2027-01-01","2027-01-11","2027-02-11","2027-02-23",
  "2027-03-21","2027-03-22","2027-04-29","2027-05-03",
  "2027-05-04","2027-05-05","2027-07-19","2027-08-11",
  "2027-09-20","2027-09-23","2027-10-11","2027-11-03",
  "2027-11-23"
]);

const dateKey = d =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const fmt = d =>
  new Date(d).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short"
  });

function getDeliveryDate(from = new Date()) {
  const d = new Date(from);
  let n = 0;

  while (n < 3) {
    d.setDate(d.getDate() + 1);

    const weekend = d.getDay() === 0 || d.getDay() === 6;
    const holiday = holidays.has(dateKey(d));

    if (!weekend && !holiday) n++;
  }

  return d;
}

function App() {
  const [qty, setQty] = useState({});
  const [customer, setCustomer] =
