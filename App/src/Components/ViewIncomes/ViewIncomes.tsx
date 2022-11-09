import { tab } from "@testing-library/user-event/dist/tab";
import axios, { AxiosError } from "axios";
import React, { SyntheticEvent } from 'react';
import { Component } from "react";
import Income from "../../Models/Income";
import "./ViewIncomes.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

interface ViewIncomesProps { }
interface ViewIncomesState {
    incomeList: Income[],
    editId: number,
    newAmount: number,
    newDesc: string,
    newCategory: number
    /* newDate: string,
    newTime: string */
}
//  start: number, end: number 

class ViewIncomes extends Component<ViewIncomesProps, ViewIncomesState>{
    constructor(props: {}) {
        super(props);
        this.state = ({
            incomeList: [],
            editId: -1,
            newAmount: 0,
            newDesc: "0",
            newCategory: 0
            /* newDate: "0",
            newTime: "0" */
        });
        // start: 0, end: 0
    }

    /* confirmOptions = {
        title: 'Title',
        message: 'Message',
        buttons: [
            {
                label: 'Yes',
                onClick: () => alert('Click Yes')
            },
            {
                label: 'No',
                onClick: () => alert('Click No')
            }
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
        keyCodeForClose: [8, 32],
        willUnmount: () => { },
        afterClose: () => { },
        onClickOutside: () => { },
        onKeypress: () => { },
        onKeypressEscape: () => { },
        overlayClassName: "overlay-custom-class-name"
    }; */

    changeAmountHandler = (e: SyntheticEvent) => {
        let newAmount = (e.target as HTMLInputElement).value;
        this.setState({ newAmount: Number(newAmount) });
    }

    changeDescHandler = (e: SyntheticEvent) => {
        let newDesc = (e.target as HTMLInputElement).value;
        this.setState({ newDesc: newDesc });
    }

    changeCategoryHandler = (e: SyntheticEvent) => {
        let newCategory = (e.target as HTMLInputElement).value;
        this.setState({ newCategory: Number(newCategory) });
    }

    /*     changeDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            const tempDate = e.target.value;
            let newDate = (e.target as HTMLInputElement).value;
            console.log(tempDate);
            this.setState({ newDate: String(tempDate) });
        }
    
        changeTimeHandler = (e: SyntheticEvent) => {
            let newTime = String((e.target as HTMLInputElement).value);
            this.setState({ newTime: newTime });
        } */

    clearEdit = () => {
        this.setState({ editId: -1, newAmount: 0, newDesc: "0", newCategory: 0 })
    }

    //    getIncomesAsync = async () => {

    //componentDidMount

    getIncomesAsync = async () => {
        // read data
        try {
            const incomePromise = await axios.get<Income[]>("http://localhost:3800/api/wallet/income/");
            let response = incomePromise.data;
            // this.users = response.data as User[];
            this.setState({ incomeList: response });
        }
        catch (error) {
            let x = error as AxiosError;
            console.log(`ViewIncomes.tsx - componentDidMount - Axios catch => ${x.response?.status} --- ${x.message}`);
        }
        finally {
        }
    }

    editIncome = (id: number) => {
        console.log(`Editing id = ${id}`);
        this.setState({ editId: id });
    }

    saveIncomeChanges = async () => {
        if (this.state.newAmount < 0) {
            alert("Can't set a negative amount!");
            return;
        }

        if (this.state.newCategory == 0 && this.state.newAmount == 0 && this.state.newDesc == "0") {
            this.clearEdit();
            this.render();
            //this.componentDidMount();
            return;
        }

        const patchIncome: any = { incomeId: this.state.editId };

        if (this.state.newCategory != 0)
            patchIncome.category = this.state.newCategory;

        if (this.state.newAmount != 0)
            patchIncome.amount = this.state.newAmount;

        if (this.state.newDesc != "0")
            patchIncome.description = this.state.newDesc;

        console.log(patchIncome);

        if (await this.sendNewIncome(patchIncome)) {
            this.clearEdit();

        }

        //   this.setState({}); // need it ?
    }

    sendNewIncome = async (newIncome: any) => {

        try {
            const res = await axios.patch<Income[]>("http://localhost:3800/api/wallet/income/", newIncome);
            console.log(res.data);
        }
        catch (error) {
            let x = error as AxiosError;
            console.log(`ViewTrans.tsx - componentDidMount - Axios catch => ${x.response?.status} --- ${x.message}`);
        }
        finally {
            return true;
        }
    }

    checkDelete = (id: number) => {
        confirmAlert({
            title: 'Delete income',
            message: 'Are you sure ?',
            buttons: [
                {
                    label: 'Yes',
                    autoFocus: true,
                    onClick: async () => {
                        await this.removeIncome(id);
                    },
                },
                {
                    label: 'No',
                    onClick: () => {
                    }
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            overlayClassName: "overlay-custom-class-name"

        });
        return false;

        /* 
        {
        title: 'Title',
        message: 'Message',
  
        closeOnEscape: true,
        closeOnClickOutside: true,
        keyCodeForClose: [8, 32],
        willUnmount: () => { },
        afterClose: () => { },
        onClickOutside: () => { },
        onKeypress: () => { },
        onKeypressEscape: () => { },
        overlayClassName: "overlay-custom-class-name"
    }
     */
    }

    removeIncome = async (id: number) => {
        console.log(`Deleting id = ${id}`);
        try {
            const res = await axios.delete<Income[]>(`http://localhost:3800/api/wallet/income/${id}`);
            console.log(res.data);
            this.setState({});
        }
        catch (error) {
            let x = error as AxiosError;
            console.log(`ViewTrans.tsx - componentDidMount - Axios catch => ${x.response?.status} --- ${x.message}`);
        }
    }

    categoryShow = (categoryNumber: number) => {
        let category: string = "";
        switch (categoryNumber) {
            case 1:
                category = "Salary";
                break;
            case 2:
                category = "Gift";
                break;
            case 3:
                category = "Refund";
                break;
            case 4:
                category = "Other";
                break;
        }
        return category;
    }

    //salary gift refund other


    render(): JSX.Element {

        console.log(this.state);

        this.getIncomesAsync();



        return <div className="ViewIncomes">

            <h3>Income's registry</h3>
            <table>
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Edit</th>
                        <th>Delete</th>

                    </tr>
                </thead>
                <tbody>

                    {this.state.incomeList.length > 0 ?
                        this.state.incomeList.map(i =>
                            (i.incomeId == this.state.editId) ?
                                <tr>        {/* Editing */}
                                    <td key={i.incomeId + "amout"}>
                                        <input autoFocus type="number" placeholder={String(i.amount)} onChange={this.changeAmountHandler} className="tdInput" />
                                    </td>
                                    <td key={i.incomeId + "desc"}>
                                        <input type="text" placeholder={i.description} onChange={this.changeDescHandler} className="tdInput" />
                                    </td>
                                    <td key={i.incomeId + "categ"}>
                                        <select defaultValue={i.category} onChange={this.changeCategoryHandler}  >
                                            <option value="1" >Salary</option>
                                            <option value="2" >Gift</option>
                                            <option value="3" >Refund</option>
                                            <option value="4" >Other</option>
                                        </select>
                                    </td>
                                    {/* <td key={i.incomeId + "date"}>
                                        <input type="date" />
                                        //  placeholder={this.returnDate(String(i.date).slice(0, 9))} 
                                        // "MM/DD/YYYY" 
                                    </td>
                                    <td key={i.incomeId + "time"}>
                                        <input type="time" placeholder={String(i.date).slice(11, 19)} onChange={this.changeTimeHandler} />
                                    </td> */}
                                    <td key={i.incomeId + "date"}>{String(i.date).slice(0, 9)}</td>
                                    <td key={i.incomeId + "time"}>{String(i.date).slice(11, 19)}</td>
                                    <td className="tdEdit" key={i.incomeId + "edit"}>
                                        <button onClick={this.saveIncomeChanges}>Save</button>
                                        <button onClick={this.clearEdit}>Cancel</button>

                                    </td>
                                    <td className="tdDelete" key={i.incomeId + "delete"}>
                                        X
                                    </td>
                                </tr>
                                :
                                <tr>        {/* Normal */}
                                    <td key={i.incomeId + "amou"}>{i.amount}</td>
                                    <td key={i.incomeId + "desc"}>{i.description}</td>
                                    <td key={i.incomeId + "categ"}>
                                        {this.categoryShow(i.category)}
                                    </td>
                                    <td key={i.incomeId + "date"}>{String(i.date).slice(0, 9)}</td>
                                    <td key={i.incomeId + "time"}>{String(i.date).slice(11, 19)}</td>
                                    <td className="tdEdit" key={i.incomeId + "edit"}>
                                        <button onClick={(e) => { this.editIncome(i.incomeId) }}>&#9998;</button>
                                    </td>
                                    <td className="tdDelete" key={i.incomeId + "delete"}>
                                        <button onClick={(e) => { this.checkDelete(Number(i.incomeId)) }}>X</button>
                                    </td>
                                </tr>

                        )
                        :
                        null
                    }
                </tbody>
            </table>

        </div >
    }

}

export default ViewIncomes;

/*  {this.state.incomeList ?
                this.state.incomeList.map(income =>
                    <p>    Amount: {income.amount}   |Description: {income.description}   |Category: {income.category}   |Date: {income.date}</p>
                )
                : null} */