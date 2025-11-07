package com.example.simplex.service;

import com.example.simplex.model.GpaRequest;

import java.util.*;

public class SimplexSolver {

    public static Map<String, Object> solve(GpaRequest request) {
        double totalCredit = request.totalCredit;
        double targetGpa = request.targetGpa;
        double currentGpa = request.currentGpa;
        double currentTotalCredit = request.currentTotalCredit;
        double semesterCredit = request.semesterCredit;

        Map<String, Object> result = new HashMap<>();

        if (semesterCredit <= 0 || totalCredit <= 0) {
            result.put("error", "Credit values must be greater than 0.");
            return result;
        }

        double requiredGPA = (totalCredit * targetGpa - currentGpa * currentTotalCredit) / semesterCredit;

        if (requiredGPA > 4.0 || requiredGPA < 0) {
            result.put("requiredGpa", requiredGPA);
            result.put("error", "Required GPA is unrealistic.Adjust your target GPA or review inputs.");
            return result;
        }

        double y = requiredGPA * 7;

        double[][] A = {
                {1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
                {1, 0.5, 1, 0.33, 1, 0.5, 0.33, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
                {2, -1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0},
                {0, 0, 3, -1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0},
                {0, 0, 0, 0, 2, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0},
                {1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0},
                {0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0},
                {0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0},
                {0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0},
                {0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0},
                {0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0},
                {0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1}
        };

        double[] b = {56, y, 0, 0, 0, 2.5, 8, 3.5, 14, 8, 10, 5};
        double[] c = {2.5, 1.25, 2.5, 0.83, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};

        int variables = 7;
        int constraints = 12;
        int totalVars = variables + constraints;
        double[][] tableau = new double[constraints + 1][totalVars + 1];

        for (int i = 0; i < constraints; i++) {
            for (int j = 0; j < variables; j++) {
                tableau[i][j] = A[i][j];
            }
            tableau[i][variables + i] = 1;
            tableau[i][totalVars] = b[i];
        }

        for (int j = 0; j < variables; j++) {
            tableau[constraints][j] = -c[j];
        }

        while (true) {
            int pivotCol = -1;
            double minVal = 0;
            for (int j = 0; j < totalVars; j++) {
                if (tableau[constraints][j] < minVal) {
                    minVal = tableau[constraints][j];
                    pivotCol = j;
                }
            }
            if (pivotCol == -1) break;

            int pivotRow = -1;
            double minRatio = Double.MAX_VALUE;
            for (int i = 0; i < constraints; i++) {
                if (tableau[i][pivotCol] > 0) {
                    double ratio = tableau[i][totalVars] / tableau[i][pivotCol];
                    if (ratio < minRatio) {
                        minRatio = ratio;
                        pivotRow = i;
                    }
                }
            }

            if (pivotRow == -1) {
                result.put("error", "Unbounded solution.");
                return result;
            }

            double pivot = tableau[pivotRow][pivotCol];
            for (int j = 0; j <= totalVars; j++) {
                tableau[pivotRow][j] /= pivot;
            }

            for (int i = 0; i <= constraints; i++) {
                if (i != pivotRow) {
                    double factor = tableau[i][pivotCol];
                    for (int j = 0; j <= totalVars; j++) {
                        tableau[i][j] -= factor * tableau[pivotRow][j];
                    }
                }
            }
        }

        double[] solution = new double[variables];
        for (int j = 0; j < variables; j++) {
            int oneRow = -1;
            boolean isBasic = true;
            for (int i = 0; i < constraints; i++) {
                if (Math.abs(tableau[i][j] - 1.0) < 1e-6) {
                    if (oneRow == -1) oneRow = i;
                    else {
                        isBasic = false;
                        break;
                    }
                } else if (Math.abs(tableau[i][j]) > 1e-6) {
                    isBasic = false;
                    break;
                }
            }
            if (isBasic && oneRow != -1) {
                solution[j] = tableau[oneRow][totalVars];
            }
        }

        String[] subjects = {"MAT121b", "MAT122b", "IMT121b", "IMT122b", "CHE1212", "CHE1222", "CHE1231"};
        List<Map<String, Object>> solList = new ArrayList<>();
        for (int i = 0; i < variables; i++) {
            Map<String, Object> entry = new HashMap<>();
            entry.put("subject", subjects[i]);
            entry.put("value", solution[i]);
            solList.add(entry);
        }

        double maxZ = tableau[constraints][totalVars];
        double GPA = maxZ / semesterCredit;
        double diff = Math.abs(requiredGPA - GPA);

        result.put("solution", solList);
        result.put("totalWeightedGpa", maxZ);
        result.put("calculatedGpa", GPA);

        return result;
    }
}
