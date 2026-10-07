const getMonthKey = (date) =>
  typeof date === "string" ? date.slice(0, 7) : "";

const getAmount = (transaction) => Number(transaction?.userMoney) || 0;

const updateMonthBudget = (budgets, monthKey, amountDelta) => {
  if (!monthKey || amountDelta === 0) return budgets;

  const budgetIndex = budgets.findIndex(
    (budget) => budget.budgetYearMonth === monthKey,
  );

  if (budgetIndex === -1) {
    if (amountDelta < 0) return budgets;

    return [
      ...budgets,
      {
        id: Date.now(),
        budgetYearMonth: monthKey,
        budgetTot: amountDelta,
        budgetCategory: {},
      },
    ];
  }

  return budgets.map((budget, index) => {
    if (index !== budgetIndex) return budget;

    const currentTotal = Number(budget.budgetTot) || 0;
    return {
      ...budget,
      budgetTot: Math.max(0, currentTotal + amountDelta),
    };
  });
};

// 이전 거래를 제거하고 새 거래를 반영한 월별 예산을 반환합니다.
export const updateBudgetsForTransactionChange = (
  budgets = [],
  previousTransaction,
  nextTransaction,
) => {
  let updatedBudgets = [...budgets];

  if (previousTransaction?.type === "수입") {
    updatedBudgets = updateMonthBudget(
      updatedBudgets,
      getMonthKey(previousTransaction.date),
      -getAmount(previousTransaction),
    );
  }

  if (nextTransaction?.type === "수입") {
    updatedBudgets = updateMonthBudget(
      updatedBudgets,
      getMonthKey(nextTransaction.date),
      getAmount(nextTransaction),
    );
  }

  return updatedBudgets;
};
