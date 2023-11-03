function convertToPx(
  value: string,
  baseFontSize: number = 16,
  outputUnit: string = "px"
) {
  const matches = value.match(/^([-+]?[0-9]*\.?[0-9]+)([a-z%]+)?$/i);

  if (!matches || matches.length < 2) {
    throw new Error(`Invalid value: ${value}`);
  }

  const numericValue = parseFloat(matches[1]);
  const unit = (matches[2] || "px").toLowerCase();

  if (isNaN(numericValue)) {
    throw new Error(`Invalid numeric value: ${value}`);
  }

  const supportedUnits = ["px", "rem", "em", "vh", "vw", "%"];

  if (!supportedUnits.includes(unit)) {
    throw new Error(`Unsupported unit: ${unit}`);
  }

  if (!supportedUnits.includes(outputUnit)) {
    throw new Error(`Unsupported output unit: ${outputUnit}`);
  }

  if (unit === "px") {
    if (outputUnit === "px") {
      return numericValue;
    } else if (outputUnit === "rem" || outputUnit === "em") {
      return numericValue / baseFontSize;
    } else if (outputUnit === "vh") {
      return (numericValue / window.innerHeight) * 100;
    } else if (outputUnit === "vw") {
      return (numericValue / window.innerWidth) * 100;
    } else if (outputUnit === "%") {
      return (numericValue / window.innerWidth) * 100; // Adjust for % based on context
    }
  } else if (unit === "rem" || unit === "em") {
    if (outputUnit === "px") {
      return numericValue * baseFontSize;
    } else if (outputUnit === "rem" || outputUnit === "em") {
      return numericValue;
    } else if (outputUnit === "vh") {
      return ((numericValue * baseFontSize) / window.innerHeight) * 100;
    } else if (outputUnit === "vw") {
      return ((numericValue * baseFontSize) / window.innerWidth) * 100;
    } else if (outputUnit === "%") {
      return ((numericValue * baseFontSize) / window.innerWidth) * 100; // Adjust for % based on context
    }
  } else if (unit === "vh") {
    if (outputUnit === "px") {
      return (numericValue / 100) * window.innerHeight;
    } else if (outputUnit === "rem" || outputUnit === "em") {
      return ((numericValue / 100) * window.innerHeight) / baseFontSize;
    } else if (outputUnit === "vh") {
      return numericValue;
    } else if (outputUnit === "vw") {
      return (numericValue / 100) * window.innerWidth;
    } else if (outputUnit === "%") {
      return (numericValue / 100) * window.innerWidth; // Adjust for % based on context
    }
  } else if (unit === "vw") {
    if (outputUnit === "px") {
      return (numericValue / 100) * window.innerWidth;
    } else if (outputUnit === "rem" || outputUnit === "em") {
      return ((numericValue / 100) * window.innerWidth) / baseFontSize;
    } else if (outputUnit === "vh") {
      return (numericValue / 100) * window.innerHeight;
    } else if (outputUnit === "vw") {
      return numericValue;
    } else if (outputUnit === "%") {
      return (numericValue / 100) * window.innerHeight; // Adjust for % based on context
    }
  } else if (unit === "%") {
    if (outputUnit === "px") {
      return (numericValue / 100) * window.innerWidth;
    } else if (outputUnit === "rem" || outputUnit === "em") {
      return ((numericValue / 100) * window.innerWidth) / baseFontSize;
    } else if (outputUnit === "vh") {
      return (numericValue / 100) * window.innerHeight;
    } else if (outputUnit === "vw") {
      return (numericValue / 100) * window.innerWidth;
    } else if (outputUnit === "%") {
      return numericValue;
    }
  } else {
    throw new Error(`Unsupported unit: ${unit}`);
  }
}

function createCssArith(
  config: {
    round?: boolean;
    baseFontSize?: number;
    roundValue?: number;
    outputUnit?: string;
  } = { round: true }
): { sum: (values: string[]) => string } {
  const {
    round = false,
    baseFontSize = 16,
    roundValue = 4,
    outputUnit = "px",
  } = config;

  function sum(values: string[]): string {
    if (values.length < 2) {
      throw new Error(
        "At least two values are required for arithmetic operations."
      );
    }

    try {
      const totalValue = values.reduce((acc, value) => {
        const numericValue = convertToPx(value, baseFontSize, outputUnit);
        return acc + Number(numericValue ?? 0);
      }, 0);

      return round
        ? Math.round(totalValue * Math.pow(10, roundValue)) /
            Math.pow(10, roundValue) +
            outputUnit
        : totalValue + outputUnit;
    } catch (error) {
      throw new Error(`Error in sum operation: ${(error as Error).message}`);
    }
  }

  return { sum };
}

export { createCssArith };
