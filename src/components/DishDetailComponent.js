import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <Card>
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name} </CardTitle>
          <CardText>{dish.description} </CardText>
        </CardBody>
      </Card>
    );
  } else {
    return <div></div>;
  }
}

function RenderComments({ comments, postComment, dishId }) {
  if (comments != null) {
    const listComment = comments.map(comment => {
      return (
        <div key={comment.id} className='text-left'>
          <p>
            <span>
              {' '}
              {comment.rating} <i className='fa fa-star'></i> ---{' '}
            </span>
            {comment.comment}
          </p>

          <p>
            -- {comment.author},{' '}
            {new Intl.DateTimeFormat('en-Us', {
              year: 'numeric',
              month: 'short',
              day: '2-digit'
            }).format(new Date(comment.date))}
          </p>
        </div>
      );
    });
    return (
      <div>
        <h4 className='text-left'>Comments</h4>
        {listComment}
        <CommentForm dishId={dishId} postComment={postComment} />
      </div>
    );
  } else {
    return <div></div>;
  }
}

const DishDetail = props => {
  if (props.isLoading) {
    return (
      <div className='container'>
        <div className='row'>
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className='container'>
        <div className='row'>
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish) {
    return (
      <div className='container'>
        <div className='row'>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to='/menu'>Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name} </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className='row'>
          <div className='col-12 col-md mr-1 my-1 p-0'>
            <RenderDish dish={props.dish} />
          </div>
          <div className='col-12 col-md m-1'>
            <RenderComments
              comments={props.comments}
              postComment={props.postComment}
              dishId={props.dish.id}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

// Validate form modal
const minLength = len => val => val && val.length >= len;
const maxLength = len => val => !val || val.length <= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(this.props.dishId, values);
  }
  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className='fa fa-pencil fa-lg '></span> Submit comments
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <LocalForm onSubmit={value => this.handleSubmit(value)}>
            <ModalBody>
              <div className='form-group'>
                <Label>Rating</Label>
                <Control.select
                  defaultValue='1'
                  model='.rating'
                  name='rating'
                  className='form-control'
                >
                  ><option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </div>
              <div className='form-group'>
                <Label htmlFor='author'>Your Name</Label>
                <Control.text
                  model='.author'
                  id='author'
                  name='author'
                  placeholder='Your Name'
                  className='form-control'
                  validators={{
                    minLength: minLength(3),
                    maxLength: maxLength(15)
                  }}
                />
                <Errors
                  className='errors'
                  model='.author'
                  show='touched'
                  messages={{
                    minLength:
                      'The author field should at least be three characters long.',
                    maxLength:
                      'The author field should be less than or equal to 15 characters.'
                  }}
                />
              </div>
              <div className='form-group'>
                <Label htmlFor='comment'>Comment</Label>
                <Control.textarea
                  model='.comment'
                  id='comment'
                  name='comment'
                  rows='6'
                  className='form-control'
                />
              </div>
              <Button type='submit' value='submit' color='primary'>
                Submit
              </Button>
            </ModalBody>
          </LocalForm>
        </Modal>
      </div>
    );
  }
}
export default DishDetail;
