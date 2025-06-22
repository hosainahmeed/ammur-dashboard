import React, { useState, useEffect } from 'react';
import { CheckIcon, PlusIcon, XMarkIcon, PencilIcon } from './icons.jsx';
import toast from 'react-hot-toast';
import { CiWarning } from 'react-icons/ci';
import PageHeading from '../../../Components/Shared/PageHeading.jsx';
export default function SubscriptionManagement() {
  const initialPlans = {
    Basic: {
      id: 'basic',
      name: 'basic',
      displayName: 'Basic Plan',
      price: '0.0',
      period: 'month',
      features: [
        { id: 1, text: 'Priority listing' },
        { id: 2, text: 'Customer messaging' },
        { id: 3, text: 'Basic analytics' },
        { id: 4, text: 'Email support' },
      ],
    },
    Standard: {
      id: 'standard',
      name: 'standard',
      displayName: 'Standard Plan',
      price: '120.99',
      period: 'year',
      features: [
        { id: 1, text: 'Priority listing' },
        { id: 2, text: 'Customer messaging' },
        { id: 3, text: 'Advanced analytics' },
        { id: 4, text: 'Premium support' },
        { id: 5, text: 'Unlimited listings' },
      ],
    },
    Primium: {
      id: 'primium',
      name: 'primium',
      displayName: 'Primium Plan',
      price: '232.99',
      period: 'year',
      features: [
        { id: 1, text: 'Priority listing' },
        { id: 2, text: 'Customer messaging' },
        { id: 3, text: 'Advanced analytics' },
        { id: 4, text: 'Premium support' },
        { id: 5, text: 'Unlimited listings' },
        { id: 6, text: 'Dedicated account manager' },
      ],
    },
  };

  const [selectedPlan, setSelectedPlan] = useState('Basic');
  const [plans, setPlans] = useState(initialPlans);

  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);

  // Form states
  const [newPrice, setNewPrice] = useState('');
  const [newPeriod, setNewPeriod] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [tempFeatures, setTempFeatures] = useState([]);

  useEffect(() => {
    if (plans[selectedPlan]) {
      setNewPrice(plans[selectedPlan].price);
      setNewPeriod(plans[selectedPlan].period);
    }
  }, [selectedPlan, plans]);

  // Open price update modal
  const handleOpenPriceModal = () => {
    setNewPrice(plans[selectedPlan].price);
    setNewPeriod(plans[selectedPlan].period);
    setIsPriceModalOpen(true);
  };

  // Save updated price
  const handleSavePrice = () => {
    const updatedPlans = {
      ...plans,
      [selectedPlan]: {
        ...plans[selectedPlan],
        price: newPrice,
        period: newPeriod,
      },
    };

    setPlans(updatedPlans);
    setIsPriceModalOpen(false);

    // Log data for backend integration
    console.log('Updated price data:', {
      planId: selectedPlan,
      price: newPrice,
      period: newPeriod,
    });
  };

  // Open feature management modal
  const handleOpenFeatureModal = () => {
    setTempFeatures([...plans[selectedPlan].features]);
    setIsFeatureModalOpen(true);
  };

  const handleAddFeature = () => {
    if (newFeature.trim() === '')
      return toast.error('please add a valid feature');
    if (tempFeatures.length >= 6) {
      return toast.error('Feature limit reached.');
    }
    const newId =
      tempFeatures.length > 0
        ? Math.max(...tempFeatures.map((f) => f.id)) + 1
        : 1;

    setTempFeatures([...tempFeatures, { id: newId, text: newFeature }]);
    setNewFeature('');
  };

  const handleRemoveFeature = (id) => {
    setTempFeatures(tempFeatures.filter((feature) => feature.id !== id));
  };

  // Save updated features
  function handleSaveFeatures() {
    const updatedPlans = {
      ...plans,
      [selectedPlan]: {
        ...plans[selectedPlan],
        features: [...tempFeatures],
      },
    };

    setPlans(updatedPlans);
    setIsFeatureModalOpen(false);

    // Log data for backend integration
    console.log('Updated features data:', {
      planId: selectedPlan,
      features: tempFeatures,
    });
  }

  return (
    <>
      <PageHeading title="Subscription" />
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Subscription Management</h1>
          <p className="text-gray-500 mt-2">
            Manage your subscription plans, pricing, and features
          </p>
        </div>

        {/* Plan Tabs */}
        <div className="w-full">
          <div className="grid grid-cols-3 mb-8 border p-1 rounded-md overflow-hidden">
            {Object.keys(plans).map((planKey) => (
              <button
                key={planKey}
                onClick={() => setSelectedPlan(planKey)}
                className={`py-3 px-4 text-center transition-colors ${
                  selectedPlan === planKey
                    ? 'bg-[#0C469D] rounded-md !text-white'
                    : 'bg-white rounded-md hover:bg-gray-50'
                } cursor-pointer`}
              >
                {planKey.charAt(0).toUpperCase() + planKey.slice(1)}
              </button>
            ))}
          </div>

          {/* Plan Content */}
          {Object.keys(plans).map((planKey) => (
            <div
              key={planKey}
              className={`mt-0 ${selectedPlan !== planKey ? 'hidden' : ''}`}
            >
              <div className="border-2 rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-2xl font-bold">
                          {plans[planKey].displayName}
                        </h2>
                        <p className="text-gray-500">
                          Subscription details and features
                        </p>
                      </div>
                      <button
                        onClick={handleOpenPriceModal}
                        className="bg-[#0C469D] hover:bg-[##0C469D] cursor-pointer !text-white px-4 py-2 rounded-md flex items-center"
                      >
                        <PencilIcon className="mr-2 h-4 w-4" />
                        Update Price
                      </button>
                    </div>
                    <div className="mb-6">
                      <span className="text-[#0C469D] text-4xl font-bold">
                        $ {plans[planKey].price}
                      </span>
                      <span className="text-gray-500 ml-1">
                        /{plans[planKey].period}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-bold">Features</h3>
                      <button
                        onClick={handleOpenFeatureModal}
                        className="border border-[#0C469D] text-[#0C469D]  cursor-pointer hover:bg-[#0C469D] hover:!text-white px-4 py-2 rounded-md flex items-center"
                      >
                        <PencilIcon className="mr-2 h-4 w-4" />
                        Manage Features
                      </button>
                    </div>

                    <ul className="space-y-3 mt-4">
                      {plans[planKey].features.map((feature) => (
                        <li
                          key={feature.id}
                          className="flex items-center gap-2"
                        >
                          <div className="flex-shrink-0 h-5 w-5 rounded-full bg-transparent border-1 bortder-[#0C469D] flex items-center justify-center">
                            <CheckIcon className="h-3 w-3 text-[#0C469D]" />
                          </div>
                          <span>{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Price Update Modal */}
        {isPriceModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold">Update Subscription Price</h2>
                <p className="text-gray-500">
                  Update the price and billing period for the{' '}
                  {plans[selectedPlan]?.displayName}.
                </p>
              </div>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label
                    htmlFor="plan-type"
                    className="block text-sm font-medium"
                  >
                    Plan Type
                  </label>
                  <select
                    id="plan-type"
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="w-full border rounded-md p-2"
                  >
                    <option value="Basic">Basic Plan</option>
                    <option value="Primium">Primium Plan</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="price" className="block text-sm font-medium">
                    Price ($)
                  </label>
                  <input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full border rounded-md p-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsPriceModalOpen(false)}
                  className="border-red-200 bg-red-50 cursor-pointer text-red-500 hover:bg-red-100 hover:text-red-600 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePrice}
                  className="bg-[#0C469D] hover:bg-[##0C469D] cursor-pointer !text-white py-2 rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Feature Management Modal */}
        {isFeatureModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold">Manage Features</h2>
                <p className="text-gray-500">
                  Add, edit, or remove features for the{' '}
                  {plans[selectedPlan]?.displayName}.
                </p>
                <p className="p-1 flex items-center animate-pulse gap-1 bg-yellow-100 rounded-md text-xs">
                  <CiWarning size={18} />
                  Please add the feature and save it.
                </p>
              </div>

              <div className="py-4">
                <div className="flex items-center space-x-2 gap-2 mb-4">
                  <input
                    placeholder="Add a new feature..."
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    className="flex-1 border rounded-md p-2"
                  />
                  <button
                    onClick={handleAddFeature}
                    className="bg-[#0C469D] hover:bg-[##0C469D] cursor-pointer !text-white p-2 rounded-md"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {tempFeatures.map((feature) => (
                    <div
                      key={feature.id}
                      className={`flex items-center justify-between p-3 border rounded-md ${
                        !plans[selectedPlan].features.some(
                          (f) => f.id === feature.id
                        )
                          ? 'bg-green-50 border-green-200'
                          : ''
                      }`}
                    >
                      <span>{feature.text}</span>
                      <button
                        onClick={() => handleRemoveFeature(feature.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 cursor-pointer hover:bg-red-50 rounded-full"
                      >
                        <XMarkIcon className="h-4 w-4 mx-auto" />
                      </button>
                    </div>
                  ))}
                  {tempFeatures.length === 0 && (
                    <p className="text-center text-gray-500 py-4">
                      No features added yet.
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsFeatureModalOpen(false)}
                  className="border-red-200 bg-red-50 text-red-500 cursor-pointer hover:bg-red-100 hover:text-red-600 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveFeatures}
                  className="bg-[#0C469D] hover:bg-[##0C469D] cursor-pointer !text-white py-2 rounded-md"
                >
                  Save Features
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
