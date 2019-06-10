import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ArrowBack from '@material-ui/icons/ArrowBack';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectOne, makeSelectCategory } from '../selectors';
import * as mapDispatchToProps from '../actions';
import BackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';

const styles = theme => ({
  
});

class AddEdit extends React.PureComponent {
  static propTypes = {
    loadOneRequest: PropTypes.func.isRequired,
    addEditRequest: PropTypes.func.isRequired,
    loadCategoryRequest: PropTypes.func.isRequired,
    setOneValue: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    classes: PropTypes.object.isRequired,
    one: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    category: PropTypes.array.isRequired,
  };

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOneRequest(this.props.match.params.id);
    }
    this.props.loadCategoryRequest();
  }

  handleChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.value });
  };

  handleCheckedChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.checked });
  };

  handleGoBack = () => {
    this.props.push('/admin/faq-manage');
  };

  handleSave = () => {
    this.props.addEditRequest();
  };

  render() {

    const { classes, category, one, match } = this.props;
    return (
      <>
        <Helmet>
          <title>
            {match && match.params && match.params.id ? 'Edit Faq' : 'Add Faq '}
          </title>
        </Helmet>
  <div class="flex justify-between mt-1 mb-1">
        <PageHeader>
        
        <IconButton className="cursor-pointer"	 onClick={this.handleGoBack} aria-label="Back">
          <BackIcon />
        </IconButton>
        </PageHeader>
        </div>
        <PageContent>
       
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Question
            </label>
            <input
           
              className="Waftinputbox"
              name="Question"
              id="faq"
              value={one.question || ''}
              onChange={this.handleChange('question')}
            />
         
            </div>
          <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Answer
            </label>
            <textarea className="Waftinputbox"
              multiline
              rows="5"
              name="Answer"
              id="faq-answer"
          
              value={one.title || ''}
              onChange={this.handleChange('title')}></textarea>
           
            </div>

            <div className="w-full md:w-1/2 pb-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select class="Waftinputbox"  value={one.category}
                  onChange={this.handleChange('category')}
                  inputProps={{
                    name: 'category',
                    id: 'category-title',
               
                  }}>

                    {category &&
                    category.length &&
                    category.map(each => (
                  
                      <option key={each._id} value={each._id}>
                        {each.title}
                     
                      </option>
                    ))}
          

                  </select>
            </div>
            

          
            <button class="text-white py-2 px-4 rounded mt-4 btn-waft"
              onClick={this.handleSave}
         
              >
                Save</button>
          
        </PageContent>
   </>
    );
  }
}

const withStyle = withStyles(styles);

const withReducer = injectReducer({ key: 'faqManagePage', reducer });
const withSaga = injectSaga({ key: 'faqManagePage', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  category: makeSelectCategory(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);
export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(AddEdit);
