import { describe, it, expect, beforeEach } from "vitest";
import StockPortfolioOptimizer from "./StockPortfolioOptimizer";

describe("StockPortfolioOptimizer", () => {
  let optimizer;

  beforeEach(() => {
    optimizer = new StockPortfolioOptimizer(10000);
  });

  it("initializes with correct budget", () => {
    expect(optimizer.budget).toBe(10000);
    expect(optimizer.stocks).toEqual([]);
  });

  it("adds stock correctly", () => {
    optimizer.addStock("AAPL", 150, 200);

    expect(optimizer.stocks).toHaveLength(1);
    expect(optimizer.stocks[0]).toMatchObject({
      name: "AAPL",
      price: 150,
      performanceIncrease: 200,
      roi: 2,
      finalValue: 450,
      maxShares: 66,
    });
  });

  it("calculates portfolio value correctly", () => {
    optimizer.addStock("AAPL", 100, 100);
    optimizer.addStock("GOOGL", 200, 150);

    const allocation = [50, 25]; // 50 shares of AAPL, 25 shares of GOOGL
    const result = optimizer.calculatePortfolioValue(allocation);

    expect(result.cost).toBe(10000); // 50*100 + 25*200
    expect(result.finalValue).toBe(22500); // 50*200 + 25*500
    expect(result.profit).toBe(12500);
    expect(result.roi).toBe(125);
  });

  it("finds optimal allocation", () => {
    optimizer.addStock("Low Performance", 100, 50);
    optimizer.addStock("High Performance", 100, 200);

    const results = optimizer.findOptimalAllocation();

    expect(results).toHaveProperty("greedy");
    expect(results).toHaveProperty("diversified");
    expect(results.greedy.allocation).toHaveLength(2);
    expect(results.diversified.allocation).toHaveLength(2);
  });

  it("returns detailed results", () => {
    optimizer.addStock("AAPL", 150, 200);
    optimizer.addStock("GOOGL", 200, 150);

    const results = optimizer.getDetailedResults();

    expect(results).toHaveProperty("stockAnalysis");
    expect(results).toHaveProperty("strategies");
    expect(results).toHaveProperty("recommendation");
    expect(results.stockAnalysis).toHaveLength(2);
    expect(results.strategies).toHaveLength(2);
  });
});
