import React, { SyntheticEvent } from "react";
import { Component } from "react";
import "./AddOutcome.css";
interface AddOutcomeProps { }
interface AddOutcomeState {
    amount: number;
    desc: string;
    category: string;
    amountError: boolean;
    categoryError: boolean;
}


class AddOutcome extends Component<AddOutcomeProps, AddOutcomeState>{
    constructor(props: AddOutcomeProps) {
        super(props);
        this.state = ({
            amount: 0, desc: "", category: "",
            amountError: false, categoryError: false
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

    submitOutcome = () => {
        this.resetErrors();
        let amountE = false;
        let categoryE = false;
        if (this.state.amount <= 0)
            amountE = true;
        if (this.state.category == "")
            categoryE = true;



        if (amountE || categoryE)
            this.setState({ amountError: amountE, categoryError: categoryE });
        else {
            this.success = true;
            this.setSuccessTimer();
            this.setState({ amount: 0, desc: "", category: "" });
        }
    }

    resetErrors = () => {
        this.setState({ amountError: false, categoryError: false });
    }

    setSuccessTimer = () => {
        let myTimeout = setTimeout(() => {
            this.success = false;
            clearTimeout(myTimeout);
            this.setState({});
        }, 3000);
    }



    render(): JSX.Element {
        return <div className="AddOutcome">
            <h2>Add Outcome</h2>

            <table>
                <tbody>
                    <tr>
                        <td>
                            Amount:

                        </td>
                        <td></td>
                        <td>
                            <input type="number" onChange={this.changeAmountHandler} value={this.state.amount != 0 ? this.state.amount : ""} />
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
                        <td></td>
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
                                <option value="" disabled selected>Select your option</option>
                                <option value="food">Food and Groceries</option>
                                <option value="clothes">Dressing</option>
                                <option value="transportation">Transportation</option>
                                <option value="rent">Rent and Bills</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="other">Other</option>
                            </select>
                            <br />
                            {this.state.categoryError ?
                                <span style={{ color: "red", fontSize: "75%" }}>Selection is required.</span>
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
                            <button onClick={this.submitOutcome}>Submit</button>
                        </td>
                        <td>
                            {this.success ? <span className="success">Outcome added!</span> : null}
                        </td>
                    </tr>
                </tbody>
            </table>

        </div >
    }
}

export default AddOutcome;