import React from "react";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";

export default class App extends React.Component {
  state = {
    group_name: "test",
    num: 0,
    url_pay: "paypayURL",
    user_name: "主催者はじめ",
    role: "平社員",
    age: 25,
    gender: "男性",
    total: 50000,
  };
  saveUserGroup() {
    console.log(this.state)
    return axios
      .post("https://gocchandesu-back.azurewebsites.net/api/CreateGroup", {
        group_name: this.state.group_name,
        num: this.state.num,
        url_pay: this.state.url_pay,
        user_name: this.state.user_name,
        role: this.state.role,
        age: this.state.age,
        gender: this.state.gender,
        total: this.state.total,
      })
      .then((res) => {
        console.log(res)
      })
  }
  handleClick = () => {
    console.log("onSubmit")
    this.saveUserGroup()
  }
  handleChangeNum = (event) => {
    this.setState({ num: event.target.value })
    console.log(event.target.value)
  }
  render() {
    let listNum = []
    for (let i = 3; i <= 30; i++) {
      listNum.push(<option value={i}>{i}</option>)
    }
    let listAge = []
    for (let i = 20; i <= 60; i++) {
      listAge.push(<option value={i}>{i}</option>)
    }
    return (
      <div>
        <div className="bg-gray-50 pb-10">
          <div className="max-w-7xl mx-auto py-12 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block">ごっちゃんです</span>
              <span className="block text-lg">楽に割り勘を請求しましょう。</span>
            </h2>
            <h2 className="text-3xl mt-6 mb-4 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block text-lg">30秒で作成可能！今すぐ作成しよう。</span>
            </h2>
            <div class="inline-block relative w-64">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name" value={this.state.group_name}>
                飲み会の名前🍺
              </label>
              <input type="text" id="name" name="name" class="w-full bg-white rounded border mb-3 border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></input>
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                何人での飲み会ですか？
              </label>
              <select
                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                value={this.state.num}
                onChange={this.handleChangeNum}
              >
                {listNum}
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
                {listAge}
              </select>
            </div>
          </div>
          <div className="text-center">
            <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={this.handleClick}>
              申請する
            </button>
          </div>
        </div>
        <Link to="/create" >Invoices</Link> |{" "}
        <Link to="/join">Expenses</Link>
        <Outlet />
      </div>
    );
  }
}