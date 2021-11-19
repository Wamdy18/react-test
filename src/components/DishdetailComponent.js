import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle,
        Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

    function RenderComment({comment}) {
        const commentDate = new Date(comment.date.slice(0,10));
        const commentFormatedDate = commentDate.toLocaleString('eng', { month: 'short', day: '2-digit', year: "numeric"});

        return(
            <li className="list-unstyled">
                <p>{comment.comment}</p>
                <p>-- {comment.author}, {commentFormatedDate}</p>
            </li>
        );
    }

    function RenderComments({comments}) {
        if (comments != null) {
            var formatedComments = [];
            for (var i=0;i<comments.length;i++) {
                formatedComments[i] = <RenderComment comment = {comments[i]} />
            }
            return(
                <ul className="list-unstyled">
                    {formatedComments}
                </ul>
            );
        }
        else {
            return(
                <div></div>
            );
        }
    }

    const DishDetail = (props) => {
            const selectedDish = props.dish;
            console.log(selectedDish);

            if (selectedDish != null) {
                return (
                    <div className="container">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>{props.dish.name}</h3>
                                <hr />
                                
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-5 m-1">
                                <Card>
                                    <CardImg width="100%" src={selectedDish.image} alt={selectedDish.name} />
                                    <CardBody>
                                        <CardTitle>{selectedDish.name}</CardTitle>
                                        <CardText>{selectedDish.description}</CardText>
                                    </CardBody>
                                </Card>
                            </div>
                            <div className="col-12 col-md-5 m-1">
                                <h4>Comments</h4>
                                <div>
                                    <RenderComments comments = {props.comments} />
                                </div>
                                <div>
                                    <CommentForm />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
            else {
                return(<div></div>);
            }
    }

    class CommentForm extends Component {
        constructor(props) {
            super(props);

            this.state = {
                isModalOpen: false
            }

            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });      
        }
        
        handleSubmit(values) {
            console.log("Current State is: " + JSON.stringify(values));
            alert("Current State is: " + JSON.stringify(values));
        }

        render() {
            return(
                <>
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil"></span> Submit Comment
                    </Button>
                    
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>
                            Submit Comment
                        </ModalHeader>
                        <ModalBody>
                            <div className="container">
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                    <Row classname="form-group">
                                        <Label htmlFor="rating">Rating</Label>
                                        <Control.select model=".rating" type="select" id="rating" name="rating" 
                                        className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Row>
                                    <Row classname="form-group">
                                        <Label htmlFor="username">Your Name</Label>
                                        <Control.text model=".username" type="text" id="username" name="username"
                                        placeholder="Your Name" className="form-control"
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        />
                                        <Errors className="text-danger" model=".username" show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }} />
                                    </Row>
                                    <Row classname="form-group">
                                        <Label htmlFor="comment">Comment</Label>
                                        <Control.textarea className="form-control" model=".comment" type="textarea" rows="6" id="comment" name="comment"
                                        />
                                    </Row>
                                    <Button type="submit" value="submit" color="primary">Submit</Button>
                                </LocalForm>
                            </div>
                        </ModalBody>
                    </Modal>
                   
                </>
            );
        }
    }


export default DishDetail;