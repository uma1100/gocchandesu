import React from "react";
import { Outlet, Link } from "react-router-dom";

export default class App extends React.Component {
  onSubmit(e) {
    e.preventDefault();
    console.log("onSubmit");
  }
  render() {
    return (
      <div>
        <div className="bg-gray-50 pb-10">
          <form onSubmit={this.onSubmit}>
            <div className="max-w-7xl mx-auto py-12 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                <span className="block">ごっちゃんです</span>
                <span className="block text-lg">楽に割り勘を請求しましょう。</span>
              </h2>
              <h2 className="text-3xl mt-6 mb-4 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                <span className="block text-lg">30秒で作成可能！今すぐ作成しよう。</span>
              </h2>
              <div class="inline-block relative w-64">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                  何人での飲み会ですか？
                </label>
                <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                  <option>3人</option>
                  <option>4人</option>
                  <option>5人</option>
                </select>
                <label class="block mt-3 uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                  あなたの役職を教えて下さい
                </label>
                <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                  <option>部長</option>
                  <option>課長</option>
                  <option>平社員</option>
                </select>
                <label class="block mt-3 uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                  何歳ですか？
                </label>
                <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                  <option>19</option>
                  <option>20</option>
                  <option>21</option>
                </select>
              </div>
            </div>
            <div className="text-center">
              <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                申請する
              </button>
            </div>
          </form>
        </div>
        <Link to="/create" >Invoices</Link> |{" "}
        <Link to="/join">Expenses</Link>
        <Outlet />
      </div>
    );
  }
}