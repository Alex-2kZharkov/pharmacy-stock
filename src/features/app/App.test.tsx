import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { store } from "../../store/store";
import { AdministrativePurchase } from "../administrative-purchase";
import { Category } from "../category";
import { Medicines } from "../medicine";
import { MedicinePurchases } from "../medicine-purchases";
import { MedicineSale } from "../medicine-sale";
import { Overview } from "../overview";
import { Recommendation } from "../recommendation";
import { UsersPage } from "../users";

import { App } from "./App";

// const testObj = {
//   user: {
//     _id: "test",
//     lastName: "test",
//     firstName: "test",
//     createdAt: new Date().toISOString(),
//     email: "test",
//     phone: "test",
//     role: {
//       _id: "string",
//       name: "string",
//       description: "string",
//       createdAt: "string",
//       updatedAt: "string",
//     },
//     updatedAt: new Date().toISOString(),
//   },
//   token: "test token",
// };

describe("App", () => {
  it("should render login page", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
    expect(getByText(/Войти в Админ Панель/)).toBeInTheDocument();
  });

  it("should render overview page", () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <Router>
          <Overview />
        </Router>
      </Provider>
    );

    expect(getAllByText("Главная")).toHaveLength(2);
  });

  it("should render medicine page", () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <Router>
          <Medicines />
        </Router>
      </Provider>
    );

    expect(getAllByText("Админ Панель")).toHaveLength(1);
  });

  it("should render medicines categories page", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <Category />
        </Router>
      </Provider>
    );

    expect(getByText("Категории товаров")).toBeInTheDocument();
  });

  it("should render medicine purchase page", () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <Router>
          <MedicinePurchases />
        </Router>
      </Provider>
    );

    expect(getAllByText("Товары на складе")).toHaveLength(2);
  });

  it("should render medicine sale page", () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <Router>
          <MedicineSale />
        </Router>
      </Provider>
    );

    expect(getAllByText("Продажи")).toHaveLength(2);
  });

  it("should render administrative purchases page", () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <Router>
          <AdministrativePurchase />
        </Router>
      </Provider>
    );

    expect(getAllByText("Админ Панель")).toHaveLength(1);
  });

  it("should render users page", () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <Router>
          <UsersPage />
        </Router>
      </Provider>
    );

    expect(getAllByText("Сотрудники")).toHaveLength(1);
  });

  it("should render recommendation page", () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <Router>
          <Recommendation />
        </Router>
      </Provider>
    );

    expect(getAllByText("Рекомендации")).toHaveLength(2);
  });
});
