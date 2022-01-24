import { balance } from "./index";

test("Run checkBallance", () => {
  const b1: string = `1000.00!=

125 Market !=:125.45
126 Hardware =34.95
127 Video! 7.45
128 Book :14.32
129 Gasoline ::16.10
`;
  const b1sol: string =
    "Original Balance: 1000.00\r\n125 Market 125.45 Balance 874.55\r\n126 Hardware 34.95 Balance 839.60\r\n127 Video 7.45 Balance 832.15\r\n128 Book 14.32 Balance 817.83\r\n129 Gasoline 16.10 Balance 801.73\r\nTotal expense  198.27\r\nAverage expense  39.65";

  expect(balance(b1)).toBe(b1sol);

  const b2: string = `1233.00
125 Hardware;! 24.8?;
123 Flowers 93.5
127 Meat 120.90
120 Picture 34.00
124 Gasoline 11.00
123 Photos;! 71.4?;
122 Picture 93.5
132 Tyres;! 19.00,?;
129 Stamps 13.6
129 Fruits{} 17.6
129 Market;! 128.00?;
121 Gasoline;! 13.6?;`;

  const b2sol: string =
    "Original Balance: 1233.00\r\n125 Hardware 24.80 Balance 1208.20\r\n123 Flowers 93.50 Balance 1114.70\r\n127 Meat 120.90 Balance 993.80\r\n120 Picture 34.00 Balance 959.80\r\n124 Gasoline 11.00 Balance 948.80\r\n123 Photos 71.40 Balance 877.40\r\n122 Picture 93.50 Balance 783.90\r\n132 Tyres 19.00 Balance 764.90\r\n129 Stamps 13.60 Balance 751.30\r\n129 Fruits 17.60 Balance 733.70\r\n129 Market 128.00 Balance 605.70\r\n121 Gasoline 13.60 Balance 592.10\r\nTotal expense  640.90\r\nAverage expense  53.41";

  expect(balance(b2)).toBe(b2sol);

  const b3: string = ` 1242.00
  122 Hardware;! 13.6
  127 Hairdresser 13.1
  123 Fruits 93.5?;
  132 Stamps;!{ 13.6?;
  160 Pen;! 17.6?;
  002 Car;! 34.00`;

  const b3sol: string =
    "Original Balance: 1242.00\r\n122 Hardware 13.60 Balance 1228.40\r\n127 Hairdresser 13.10 Balance 1215.30\r\n123 Fruits 93.50 Balance 1121.80\r\n132 Stamps 13.60 Balance 1108.20\r\n160 Pen 17.60 Balance 1090.60\r\n002 Car 34.00 Balance 1056.60\r\nTotal expense  185.40\r\nAverage expense  30.90";

  expect(balance(b3)).toBe(b3sol);
});
