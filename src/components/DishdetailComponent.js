import React , { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Row, Col, Label,
    CardTitle, Breadcrumb, BreadcrumbItem , Button ,Modal, ModalHeader, ModalBody, } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            isModalOpen : false,
        }
    }
    
    toggleModal = () => {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }
    
    handleSubmit = (values) => {
        console.log('Current State is: ' + JSON.stringify(values));
        this.props.postComment(this.props.dishId, values.rating, values.YourName, values.comment);    
    }
    
    render() {
        return(
            <React.Fragment>
                <Button outline onClick={this.toggleModal} ><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal} >Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                            <Row className="form-group">
                                <Label htmlFor="rating" sm={12}>Rating</Label>
                                <Col>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="YourName" sm={12}>Your Name</Label>
                                <Col>
                                    <Control.text model=".YourName" name="YourName" id="YourName"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".YourName"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                                
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" sm={12}>Comment</Label>
                                <Col    >
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col sm={{size:10}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

const RenderMenu = ({dish}) => {
    return (
        <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
    <Card>
        <CardImg src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
            </CardBody>
    </Card>
    </FadeTransform>

    );
}

const RenderComments = ({ comments, postComment, dishId }) => {
    let options = { year: "numeric", month: "short", day: "numeric" };

    const com = comments.map(comment => {
        return (

            <React.Fragment>
            <li key={comment.id} className="mb-2">{comment.comment}</li>
              <li>
                -- {comment.author}{" "}
                {new Date(comment.date).toLocaleDateString("en-US", options)}
              </li>

            </React.Fragment>

            );
        })

    if (comments != null) {
          return (
            <React.Fragment>
                <ul  className="list-unstyled">
                    {com}
                </ul>
                <CommentForm dishId={dishId} postComment={postComment} />    
            </React.Fragment>

          );
    } 
    else {
        return <div />;
    }
}

const DishDetail = (props) => {
        const { dish } = props; 
    
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (dish == null) 
                {
                    return <div />;
                }
            else {
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
                            <div  className="col-12 col-md-5 m-1">
                                <RenderMenu dish = { dish } />
                            </div>
                            <div className="col-12 col-md-5 m-1">
                                <h4>Comments</h4>
                                <RenderComments comments={props.comments}
                                    postComment={props.postComment}
                                    dishId={props.dish.id}
                                  />
                            </div>
                        </div>
                    </div>
        );
        }
    
}

export default DishDetail;