import React from "react";
import ReactModal from 'react-modal';
import { FaLink } from 'react-icons/fa'
import Modal from "react-modal";
import axios from "axios";
import { CopyToClipboard } from 'react-copy-to-clipboard';

Modal.setAppElement("#root");


export default class List extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      group_id: "",
      name: "",
      role: "役職",
      age: 25,
      gender: "男性",
      user_data: [],
      group_data: [],
      total_point: 0,
      successShare: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  comma(num) {
    return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  }

  getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  componentDidMount() {
    let group_id = this.getParam("group_id")
    this.setState({ group_id: group_id })
    this.getGroupUsers(group_id);
    this.getGroup(group_id);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  saveUser() {
    return axios
      .post("https://gocchandesu-back.azurewebsites.net/api/CreateUser", {
        group_id: this.state.group_id,
        name: this.state.name,
        role: this.state.role,
        age: this.state.age,
        gender: this.state.gender,
      })
      .then((res) => {
        console.log(res)
      })
  }

  getGroupUsers(group_id) {
    return axios
      .get(`https://gocchandesu-back.azurewebsites.net/api/GetUsers?group_id=${group_id}`)
      .then((res) => {
        console.log(res.data)
        this.setState({ user_data: res.data })
        let total_point = 0
        res.data.map((item) => {
          total_point += item.point
          return true;
        })
        this.setState({ total_point: total_point })
        let userData = []
        res.data.map((item,index) => {
          const elm = (
            <div className="bg-white rounded py-5 mx-4 pl-6 flex items-start shadow">
              <div className="pl-3 pr-10 mt-1">
                <h3 className="font-normal leading-4 text-gray-800 text-base">{item.name}</h3>
                <div className="flex items-end mt-4">
                  <h2 className="text-gray-800 text-2xl leading-normal font-bold">{this.comma(Math.round(this.state.group_data.total * (item.point / total_point)))}円</h2>
                </div>
                <div className="flex mt-2 ">
                  <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                    送金する
                  </button>
                </div>
              </div>
            </div>
          )
          userData.push(elm)
          return true;
        })
      })
  }

  getGroup(group_id) {
    return axios
      .get(`https://gocchandesu-back.azurewebsites.net/api/GetGroup?group_id=${group_id}`)
      .then((res) => {
        console.log(res.data)
        this.setState({ group_data: res.data })
      })
  }

  handleClick = () => {
    console.log("onSubmit")
    this.setState({ showModal: false });
    this.saveUser()
    this.getGroupUsers(this.state.group_id)
    window.location.reload(false);
  }
  saveUserData() {
    console.log(this.state)
  }
  handleChangeNum = (event) => {
    this.setState({ num: event.target.value })
    console.log(
      event.target.value)
  }
  handleChangeRole = (event) => {
    this.setState({ role: event.target.value })
  }
  handleChangeAge = (event) => {
    this.setState({ age: event.target.value })
  }
  handleChangeName = (event) => {
    this.setState({ name: event.target.value })
  }
  handleClickURLShare = (event) => {
    this.setState({ successShare: true })
  }
  render() {
    let listAge = []
    for (let i = 20; i <= 60; i++) {
      listAge.push(<option value={i}>{i}</option>)
      setTimeout(function () {
        this.setState({ successShare: false })
      }.bind(this), 3000)
    }
    let userData = [];
    this.state.user_data.map((item,index) => {
      const elm = (
        <div className="bg-white rounded py-5 mx-4 pl-6 flex items-start shadow">
          <div className="pl-3 pr-10 mt-1">
            <h3 className="font-normal leading-4 text-gray-800 text-base">{item.name}</h3>
            <div className="flex items-end mt-4">
              <h2 className="text-gray-800 text-2xl leading-normal font-bold">{this.comma(Math.round(this.state.group_data.total * (item.point / this.state.total_point)))}円</h2>
            </div>
            <div className="flex mt-2 ">
              <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                送金する
              </button>
            </div>
          </div>
        </div>
      )
      userData.push(elm)
      return true;
    })
    return (
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl text-center my-4">
          <span className="block">ごっちゃんです</span>
          <span className="block text-lg">楽に割り勘を請求しましょう。</span>
        </h2>
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl text-center my-4">
          <span className="block">🍺{this.state.group_data.name}🎉</span>
          <span className="block text-lg">予算：{this.comma(this.state.group_data.total)}円</span>
        </h2>
        <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {userData}
        </div>
        <div className="flex justify-center my-5">
          <button className=" text-white font-semibold e py-2 px-4 border bg-indigo-500 rounded-full mx-3" onClick={this.handleOpenModal}>+</button>
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="Minimal Modal Example"
          >
            <div className="item-center">
              <div class="inline-block relative w-64">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" for="grid-first-name">
                  名前
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  class="w-full bg-white rounded border mb-3 border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={this.state.name}
                  onChange={this.handleChangeName}
                >
                </input>

                <label
                  class="block mt-3 uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  あなたの役職を教えて下さい
                </label>
                <select
                  class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  value={this.state.role}
                  onChange={this.handleChangeRole}
                >
                  <option>部長</option>
                  <option>課長</option>
                  <option>平社員</option>
                </select>
                <label class="block mt-3 uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                  何歳ですか？
                </label>
                <select
                  class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  value={this.state.age}
                  onChange={this.handleChangeAge}
                >
                  {listAge}
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
                <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={this.handleClick}>
                  申請する
                </button>
              </div>
              <div className="text-center my-4">
                <button onClick={this.handleCloseModal} className="text-indigo-500 bg-white border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  閉じる
                </button>
              </div>
            </div>
          </ReactModal>
          <CopyToClipboard
            text={window.location.href}
            onCopy={() => alert(`クリップボードにをコピーしました。こちらのURLをシェアしてください。`)}
          >
            <button className=" bg-white font-semibold e py-2 px-4 border text-indigo-500 rounded-full mx-3"><FaLink /></button>

          </CopyToClipboard>
        </div>

      </div>

    );
  }
}