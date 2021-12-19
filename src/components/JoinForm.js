import { div } from "prelude-ls";
import React from "react";

export default class JoinForm extends React.Component {
  saveUserData(e){
    e.preventDefault();
    console.log("submit")
  }
  render() {
    return (
      <form onSubmit={this.saveUserData}>
        <div class="inline-block relative w-64">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" for="grid-first-name">
            名前
          </label>
          <input type="text" id="name" name="name" class="w-full bg-white rounded border mb-3 border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></input>
          
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
          <label class="block mt-3 uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
            性別
          </label>
          <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option>男性</option>
            <option>女性</option>
            <option>無回答</option>
          </select>
        </div>
        <div className="text-center my-4">
          <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            申請する
          </button>
        </div>
      </form >
    );
  }
}
