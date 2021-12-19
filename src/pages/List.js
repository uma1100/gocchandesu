import React from "react";
import ReactModal from 'react-modal';
import { FaLink } from 'react-icons/fa'
import Modal from "react-modal";
import JoinForm from '../components/JoinForm'

Modal.setAppElement("#root");


export default class List extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl text-center my-4">
          <span className="block">ごっちゃんです</span>
          <span className="block text-lg">楽に割り勘を請求しましょう。</span>
        </h2>
        <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div className="bg-white rounded py-5 mx-4 pl-6 flex items-start shadow">
            <div className="text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-dashboard" width={32} height={32} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx={12} cy={13} r={2} />
                <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
                <path d="M6.4 20a9 9 0 1 1 11.2 0Z" />
              </svg>
            </div>
            <div className="pl-3 pr-10 mt-1">
              <h3 className="font-normal leading-4 text-gray-800 text-base">糸長優磨</h3>
              <div className="flex items-end mt-4">
                <h2 className="text-gray-800 text-2xl leading-normal font-bold">2,330円</h2>
              </div>
              <div className="flex mt-2 ">
                <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  送金する
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center my-5">
          <button className=" text-white font-semibold e py-2 px-4 border bg-indigo-500 rounded-full mx-3" onClick={this.handleOpenModal}>+</button>
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="Minimal Modal Example"
          >
            <div className="item-center">
              <JoinForm />
              <div className="text-center my-4">
                <button onClick={this.handleCloseModal} className="text-indigo-500 bg-white border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  閉じる
                </button>
              </div>
            </div>
          </ReactModal>
          <button className=" bg-white font-semibold e py-2 px-4 border text-indigo-500 rounded-full mx-3"><FaLink /></button>
        </div>
      </div>

    );
  }
}