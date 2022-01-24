class StringBuilder {
  /**
   * Initial balance
   */
  private bNum: number = 0;

  constructor(str: string = "") {
    const splinters = str.split(/\n/);

    // get first
    const first = splinters.shift() || "";

    // match an integer for balance
    const match = first.match(/\d+(?:\.\d+)?/);
    if (match) {
      this.bNum = Number(match[0]);
    }

    // parse splinters
    splinters.forEach((splint) => {
      const match = splint.match(/(\d+)(.+?)(\d+(?:\.\d+)?)/i);
      if (match) {
        // add new row
        this.rows.push([
          // id
          Number(match[1]),
          // clean string
          match[2].replace(/[^\w|\s]/g, "").trim(),
          // money
          Number(match[3]),
        ]);
      }
    });
  }

  /**
   * Parsed rows
   */
  private rows: [number, string, number][] = [];

  /**
   * Final build
   * @returns array
   */
  public getFinal(): string {
    const rows = this.rows.reduce(
      (rows: [string[], number], el: [number, string, number]) => {
        rows[1] -= el[2];
        // build row string
        const r =
          String(el[0]).padStart(3, "0") +
          " " +
          el[1] +
          " " +
          el[2].toFixed(2) +
          " " +
          "Balance" +
          " " +
          rows[1].toFixed(2);
        rows[0].push(r);
        return rows;
      },
      [[], this.bNum]
    );

    const total = this.bNum - rows[1];

    const text =
      // build original balance string
      `Original Balance: ${this.bNum.toFixed(2)}\r\n` +
      // berge the rows
      rows[0].join("\r\n") +
      "\r\n" +
      // build total expense string
      `Total expense  ${total.toFixed(2)}\r\n` +
      // build average expense string
      `Average expense  ${(total / this.rows.length).toFixed(2)}`;

    return text;
  }
}

export function balance(book: string): string {
  const strBuilder = new StringBuilder(book);

  return strBuilder.getFinal();
}
