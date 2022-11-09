import axios, { AxiosError } from 'axios';
import React, { SyntheticEvent } from 'react';
import { Component } from "react";
import Income from '../../Models/Income';
import "./AddIncome.css";
// ===___add DATE and Time input___=== \\
interface AddIncomeProps {
/*     callback: () => void;
 */}

interface AddIncomeState {
    amount: number;
    desc: string;
    category: string;
    amountError: boolean;
    categoryError: boolean;
}


class AddIncome extends Component<AddIncomeProps, AddIncomeState>{
    constructor(props: AddIncomeProps) {
        super(props);
        this.state = ({
            amount: 0, desc: "", category: "",
            amountError: false, categoryError: false,
        });
    }

    private success: boolean = false;

    changeAmountHandler = (e: SyntheticEvent) => {
        let newAmount = Number((e.target as HTMLInputElement).value);
        this.setState({ amount: newAmount });
    }

    changeDescHandler = (e: SyntheticEvent) => {
        this.setState({ desc: (e.target as HTMLInputElement).value })
    }

    changecategoryHandler = (e: SyntheticEvent) => {
        let newCategory = (e.target as HTMLInputElement).value;
        this.setState({ category: newCategory });
    }

    resetErrors = () => {
        this.setState({ amountError: false, categoryError: false });
    }

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    handleSubmit = async () => { /* (e: any) */
        // e.preventDefault();
        this.resetErrors();
        let amountE: boolean = false;
        let categoryE: boolean = false;
        if (this.state.amount <= 0)
            amountE = true;
        if (Number(this.state.category) > 4 || Number(this.state.category) < 1)
            categoryE = true;

        if (amountE || categoryE) {
            this.setState({ amountError: amountE, categoryError: categoryE });
            return;
        }
        else {
            await this.sendIncomeAsync()
            this.success = true;
            this.setSuccessTimer();
            this.setState({ amount: 0, desc: "", category: "" });

        }

    }

    sendIncomeAsync = async () => {
        // read data
        try {
            const cat = this.categorySwitch();

            const res = await axios.post<Income[]>("http://localhost:3800/api/wallet/income/", { amount: this.state.amount, description: this.state.desc, category: cat, date: new Date() });
            console.log(res.data);
        }
        catch (error) {
            let x = error as AxiosError;
            console.log(`ViewTrans.tsx - componentDidMount - Axios catch => ${x.response?.status} --- ${x.message}`);
        }
        /* finally {
            this.props.callback();
        } */
    }

    categorySwitch = () => {
        let cat: string = "0";
        switch (this.state.category) {
            case "salary":
                cat = "1";
                break;
            case "gift":
                cat = "2";
                break;
            case "refund":
                cat = "3";
                break;
            case "other":
                cat = "4";
                break;
        }
        return cat;
    }

    setSuccessTimer = () => {
        let myTimeout = setTimeout(() => {
            this.success = false;
            clearTimeout(myTimeout);
            this.setState({});
        }, 3000);
    }

    render(): JSX.Element {

        return <div className="AddIncome">

            <h2>Add Income</h2>
            {/* (e: React.SyntheticEvent) => {
    e.preventDefault(); */}
            {/* <form onSubmit={this.handleSubmit}> */}
            <table>
                <tbody>
                    <tr>
                        <td>
                            Amount:
                        </td>
                        <td></td>
                        <td>
                            <input type="number" onChange={this.changeAmountHandler} value={this.state.amount != 0 ? this.state.amount : ""} autoFocus />
                            <br />
                            {this.state.amountError ?
                                <span style={{ color: "red", fontSize: "75%" }}>Positive number please.</span>
                                : null}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Describtion:
                        </td>
                        <td style={{fontSize: "10px", textAlign:"left"}}>*not required</td>
                        <td>
                            <input type="string" onChange={this.changeDescHandler} value={this.state.desc} placeholder="You may leave it empty" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Category:
                        </td>
                        <td></td>
                        <td>
                            <select value={this.state.category} onChange={this.changecategoryHandler} >
                                <option value="" selected>Select your option</option>
                                <option value="salary">Salary</option>
                                <option value="gift">Gift</option>
                                <option value="refund">Refund</option>
                                <option value="other">Other</option>
                            </select>
                            <br />
                            {this.state.categoryError ?
                                <span style={{ color: "red", fontSize: "75%" }}>Category is required.</span>
                                : null}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            {/*                             <button type="submit">Submit</button> */}
                            <button onClick={this.handleSubmit}>Submit</button>
                        </td>
                        <td>
                            {this.success ? <span className="success">Income added!</span> : null}
                        </td>
                    </tr>
                </tbody>
            </table>
            {/*             </form> */}
        </div >
    }
}

export default AddIncome;