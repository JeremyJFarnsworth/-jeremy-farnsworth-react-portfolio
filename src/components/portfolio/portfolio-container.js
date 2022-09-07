import React, { Component } from "react";
import axios from 'axios'
import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
    constructor() {
        super();

        this.state = {
            pageTitle: "Welcome to my portfoliio",
            isLoading: false,
            data: []
        }

        this.handlefilter = this.handleFilter.bind(this);
        this.getPortfolioItems = this.getPortfolioItems.bind(this)
    };

    handleFilter(filter) {
        this.setState({
            data: this.state.data.filter(item => {
                return item.category === filter;
            })
        });
    }

    getPortfolioItems() {
        axios.get('https://jeremy.devcamp.space/portfolio/portfolio_items')
            .then(response => {
                console.log("recieved data", response)
                this.setState({
                    data: response.data.portfolio_items
                })
            })
            .catch(error => {

                console.log(error);
            })
    }

    PortfolioItems() {
        return this.state.data.map(item => {
            return (
                <PortfolioItem key={item.id} item={item} />
            );
        });
    }


    componentDidMount() {
        this.getPortfolioItems();
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>
        }

        return (
            <div className="portfolio-items-wrapper">{this.PortfolioItems()}
                <button className="btn" onClick={() => this.handleFilter('eCommerce')}>eCommerce</button>
                <button className="btn" onClick={() => this.handleFilter('Scheduling')}>Scheduling</button>
                <button className="btn" onClick={() => this.handleFilter('Enterprise')}>Enterprise</button>
                

                
            </div>





        )
    }
}
