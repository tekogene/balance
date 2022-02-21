class StringBuilder {
  private balance: number = 0;
  private rex = {
    matchDigitsAsFloat(str: string = ""): RegExpMatchArray | null {
      return str.match(/\d+(?:\.\d+)?/);
    },
    matchRowData(
      str: string = ""
    ): { id: string; text: string; amount: string } | null {
      const match = str.match(
        /(?<id>\d+)(?<text>.+?)(?<amount>\d+(?:\.\d+)?)/i
      );

      if (!match) {
        return null;
      }

      return {
        id: match.groups!["id"],
        text: match.groups!["text"],
        amount: match.groups!["amount"],
      };
    },
  };
  private substract = (first: number, second: number): number => {
    return Number((first - second).toFixed(2));
  };

  constructor(book: string = "") {
    const bookRows = book.split(/\n/);
    const firstRow = bookRows.shift() || "";

    const match = this.rex.matchDigitsAsFloat(firstRow);
    if (match) {
      this.balance = Number(match[0]);
    }

    bookRows.forEach((row) => {
      this.setRowElements(row);
    });
  }

  private cleanString(str: string): string {
    return str.replace(/[^\w|\s]/g, "").trim();
  }

  private getOriginAsString(): string {
    return `Original Balance: ${this.balance.toFixed(2)}`;
  }

  private getTotalAsString(total: number): string {
    return `Total expense  ${total.toFixed(2)}`;
  }

  private getAverageAsString(average: number): string {
    return `Average expense  ${average.toFixed(2)}`;
  }

  private getRowAsString({
    id,
    text,
    amount,
    remainder,
  }: {
    id: number;
    text: string;
    amount: number;
    remainder: number;
  }): string {
    return [
      String(id).padStart(3, "0"),
      text,
      amount.toFixed(2),
      "Balance",
      remainder.toFixed(2),
    ].join(" ");
  }

  private rowsElements: [number, string, number][] = [];

  private setRowElements(str: string): void {
    const rowData = this.rex.matchRowData(str);
    if (!rowData) {
      return;
    }
    const { id, text, amount } = rowData;
    this.rowsElements.push([
      Number(id),
      this.cleanString(text),
      Number(amount),
    ]);
  }

  private getRowsAndRemainder(): [string[], number] {
    return this.rowsElements.reduce(
      ([finalRows, remainder]: [string[], number], [id, text, amount]) => {
        remainder = this.substract(remainder, amount);
        finalRows.push(
          this.getRowAsString({
            id,
            text,
            amount,
            remainder,
          })
        );
        return [finalRows, remainder];
      },
      [[], this.balance]
    );
  }

  public getFinalString(): string {
    const [finalRows, remainder] = this.getRowsAndRemainder();
    const totalExpense = this.substract(this.balance, remainder);

    return [
      this.getOriginAsString(),
      ...finalRows,
      this.getTotalAsString(totalExpense),
      this.getAverageAsString(totalExpense / this.rowsElements.length),
    ].join("\r\n");
  }
}

export function balance(book: string): string {
  const strBuilder = new StringBuilder(book);

  return strBuilder.getFinalString();
}
