import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const RenderMenu = ({dish}) => {
    return (
    <Card>
        <CardImg src={dish.image} alt={dish.name} />
            <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
            </CardBody>
    </Card>
    );
}

const RenderComments = ({ comments }) => {
    if (comments != null) {
          let options = { year: "numeric", month: "short", day: "numeric" };
          return comments.map(comment => (
            <ul key={comment.id} className="list-unstyled">
              <li className="mb-2">{comment.comment}</li>
              <li>
                -- {comment.author}{" "}
                {new Date(comment.date).toLocaleDateString("en-US", options)}
              </li>
            </ul>
          ));
    } 
    else {
        return <div />;
    }
}

const DishDetail = (props) => {
        const { dish } = props; 
            if (dish == null) 
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
                                <RenderComments comments = { props.comments } />
                            </div>
                        </div>
                    </div>
        );
        }
    
}

export default DishDetail;