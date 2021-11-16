import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle,
        Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

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
                // formatedComments[i] = this.renderComment(comments[i]);
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
                            </div>
                        </div>
                    </div>
                );
            }
            else {
                return(<div></div>);
            }
    }


export default DishDetail;