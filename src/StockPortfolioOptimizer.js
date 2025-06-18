class StockPortfolioOptimizer {
  constructor(budget) {
    this.budget = budget;
    this.stocks = [];
  }

  addStock(name, price, performanceIncrease) {
    this.stocks.push({
      name,
      price,
      performanceIncrease,
      roi: performanceIncrease / 100, // Convert percentage to decimal
      finalValue: price * (1 + performanceIncrease / 100),
      maxShares: Math.floor(this.budget / price),
    });
  }

  calculatePortfolioValue(allocation) {
    let totalCost = 0;
    let totalFinalValue = 0;

    allocation.forEach((shares, index) => {
      const stock = this.stocks[index];
      const cost = shares * stock.price;
      const finalValue = shares * stock.finalValue;

      totalCost += cost;
      totalFinalValue += finalValue;
    });

    return {
      cost: totalCost,
      finalValue: totalFinalValue,
      profit: totalFinalValue - totalCost,
      roi: ((totalFinalValue - totalCost) / totalCost) * 100,
    };
  }

  findOptimalAllocation() {
    // Sort stocks by ROI for greedy approach
    const sortedStocks = [...this.stocks]
      .map((stock, index) => ({ ...stock, originalIndex: index }))
      .sort((a, b) => b.roi - a.roi);

    // Strategy 1: Pure greedy (highest ROI first)
    let remainingBudget = this.budget;
    const greedyAllocation = new Array(this.stocks.length).fill(0);

    for (const stock of sortedStocks) {
      const maxAffordable = Math.floor(remainingBudget / stock.price);
      greedyAllocation[stock.originalIndex] = maxAffordable;
      remainingBudget -= maxAffordable * stock.price;
    }

    // Strategy 2: Diversified approach (at least 1 share of top performers if affordable)
    const diversifiedAllocation = new Array(this.stocks.length).fill(0);
    let diversifiedBudget = this.budget;

    // First, try to buy at least 1 share of each affordable stock with good performance
    const affordableStocks = sortedStocks.filter(
      (stock) => stock.price <= diversifiedBudget
    );

    // Buy 1 share of top performers first (if performance > 200%)
    for (const stock of affordableStocks) {
      if (
        stock.performanceIncrease >= 200 &&
        diversifiedBudget >= stock.price
      ) {
        diversifiedAllocation[stock.originalIndex] = 1;
        diversifiedBudget -= stock.price;
      }
    }

    // Then allocate remaining budget to highest performers
    for (const stock of sortedStocks) {
      const currentShares = diversifiedAllocation[stock.originalIndex];
      const maxAdditional = Math.floor(diversifiedBudget / stock.price);
      diversifiedAllocation[stock.originalIndex] =
        currentShares + maxAdditional;
      diversifiedBudget -= maxAdditional * stock.price;
    }

    return {
      greedy: {
        allocation: greedyAllocation,
        performance: this.calculatePortfolioValue(greedyAllocation),
      },
      diversified: {
        allocation: diversifiedAllocation,
        performance: this.calculatePortfolioValue(diversifiedAllocation),
      },
      sortedStocks,
    };
  }

  getDetailedResults() {
    const results = this.findOptimalAllocation();

    const strategies = [
      { name: "Pure Performance Strategy", data: results.greedy },
      { name: "Diversified Strategy", data: results.diversified },
    ];

    const detailedResults = {
      stockAnalysis: results.sortedStocks.map((stock, rank) => ({
        rank: rank + 1,
        name: stock.name,
        price: stock.price,
        performance: stock.performanceIncrease,
        roi: stock.roi,
        finalValue: stock.finalValue,
        maxShares: stock.maxShares,
      })),
      strategies: strategies.map((strategy) => ({
        name: strategy.name,
        allocation: strategy.data.allocation
          .map((shares, index) => ({
            stock: this.stocks[index],
            shares,
            cost: shares * this.stocks[index].price,
            finalValue: shares * this.stocks[index].finalValue,
          }))
          .filter((item) => item.shares > 0),
        performance: strategy.data.performance,
        remainingBudget: this.budget - strategy.data.performance.cost,
      })),
      recommendation:
        results.greedy.performance.roi > results.diversified.performance.roi
          ? "Pure Performance"
          : "Diversified",
    };

    return detailedResults;
  }
}

export default StockPortfolioOptimizer;
