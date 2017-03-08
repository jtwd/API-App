// Dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import dateformat from 'dateformat';
import { Table } from 'reactable';
import { Alert, Glyphicon, Button } from 'react-bootstrap';
import _ from 'lodash';

// Project imports
import {
  DATA_LOAD_ERROR,
} from '../../../constants';
import { confirm, prompt } from '../../common/Confirmation/utils/confirm';
import {
  addFlashMessage,
  deleteFlashMessage,
} from '../../../actions';
import { LoadingAni } from '../../../components';
import './PromotionsTable.css';

const content = {
  emptyWarning: 'There are currently no active or draft promotions on the system',
  dataLoadError: 'There was a problem loading promotion data. Please try again later.',
};

class PromotionsTable extends Component {
  static propTypes = {
    promotions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    error: PropTypes.object,
    addFlashMessage: PropTypes.func.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      promoToDelete: null,
    };

    this.tableConfig = {
      itemsPerPage: 10,
      pageButtonLimit: 5,
      sortable: [
        'Promotion',
        'Created',
      ],
      defaultSort: {
        column: 'Created',
        direction: 'desc'
      },
      filterable: [
        'Promotion',
      ]
    };

    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._closeModal = this._closeModal.bind(this);
  }

  _closeModal() {
    this.setState({
      modalIsOpen: false,
      promoToDelete: null,
    });
  }

  _handleDeleteClick(promoId) {
    const options = {
      title: 'Delete promotion'
    };
    confirm(`Are you sure you want to delete: ${this._getPromoName(promoId)}?`, options).then(() => {
      console.log('proceed!');
    }, () => {
      console.log('cancel!');
    });
  }

  _handleNewClick() {
    const options = {
      title: 'Create new promotions'
    };
    prompt('', options).then(({input}) => {
      console.log('proceed pressed! ' + input);
    }, () => {
      console.log('cancel');
    })
  }

  _getPromoName(id) {
    if (!this.props.promotions[id]) return '';

    return this.props.promotions[id].Name;
  }

  render() {
    const { isLoading, isLoaded, promotions, error } = this.props;


    if (isLoading) return (<LoadingAni />);

    if (error) {
      this.props.deleteFlashMessage(DATA_LOAD_ERROR);
      this.props.addFlashMessage({ // add flash error message
        id: DATA_LOAD_ERROR,
        type: 'error',
        text: content.dataLoadError,
      });
    }

    if (isLoaded) {
      this.props.deleteFlashMessage(DATA_LOAD_ERROR);

      const newPromotions = _.values(promotions);

      if (newPromotions.length === 0) {
        return (
          <Alert bsStyle="warning">{content.emptyWarning}</Alert>
        )
      }

      this.tableData = newPromotions.map((promo) => {
        const btns = (
          <div className="tbl-btns">
            <Link
              title="Edit"
              to={`/promotions/${promo.Id}`}
              className="btn btn-primary btn-sm"><Glyphicon glyph="edit" /></Link>

            <Button
              title="Delete"
              className="btn btn-danger btn-sm"
              onClick={() => { this._handleDeleteClick(promo.Id) }}><Glyphicon glyph="remove-circle" /></Button>
          </div>
        );

        return {
          'Promotion': promo.Name,
          'Created': dateformat(promo.CreatedDate, "yyyy-mm-dd"),
          '': btns
        }
      });

    }

    return (
      <div>
        <button onClick={this._handleNewClick} className="btn btn-primary AddNewButton"><strong>+</strong> &nbsp;Create New Promotion</button>
        <div className="panel">
          <Table
            className="table"
            data={this.tableData}
            itemsPerPage={this.tableConfig.itemsPerPage}
            pageButtonLimit={this.tableConfig.pageButtonLimit}
            sortable={this.tableConfig.sortable}
            defaultSort={this.tableConfig.defaultSort}
            filterable={this.tableConfig.filterable}
          />
        </div>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    promotions: state.promotions.items,
    isLoading: state.promotions.isLoading,
    isLoaded: state.promotions.isLoaded,
    error: state.promotions.error,
  };
}

export default connect(
  mapStateToProps, // State
  {
    addFlashMessage,
    deleteFlashMessage,
  } // Actions
)(PromotionsTable);